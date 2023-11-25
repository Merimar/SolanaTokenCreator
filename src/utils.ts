import { Metaplex, keypairIdentity as keypairIdentityJS } from "@metaplex-foundation/js";
import { CreateMetadataAccountV3InstructionAccounts, CreateMetadataAccountV3InstructionDataArgs, DataV2Args, createMetadataAccountV3 } from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, keypairIdentity as keypairIdentityUMI} from "@metaplex-foundation/umi";
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { publicKey } from "@metaplex-foundation/umi-public-keys";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import * as splToken from "@solana/spl-token";

function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export async function createNFT(secret: any, connection: Connection, name:string, uri: string, sellerFeeBasisPoints:number = 0) {
	const wallet = Keypair.fromSecretKey(new Uint8Array(secret));
	const metaplex = Metaplex.make(connection).use(keypairIdentityJS(wallet))

	console.log("Creating NFT ...");

	const { nft } = await metaplex.nfts().create({
		uri: uri,
		name: name,
		sellerFeeBasisPoints: sellerFeeBasisPoints
	});

	console.log("NFT created!");
	console.log("Details:", nft);
}


export async function createToken(secret: any, connection: Connection, umiSOLEndpoint:string, onChainMetadata: DataV2Args) {
	const umi = createUmi(umiSOLEndpoint);
	const wallet = Keypair.fromSecretKey(new Uint8Array(secret));
	const myKeypair = umi.eddsa.createKeypairFromSecretKey(wallet.secretKey);
	const signer = createSignerFromKeypair(umi, myKeypair);
	umi.use(keypairIdentityUMI(signer));

	console.log("Creating Fungible Token ...");

	const token = await splToken.createMint(connection, wallet, wallet.publicKey, null, 9);
	const tokenAddress = publicKey(token);

	console.log("Token created: ", tokenAddress);
	console.log("Waiting 5 seconds:");

	await sleep(5000);

	console.log("Setting metadata ...");

	await sleep(1000);

	const accounts: CreateMetadataAccountV3InstructionAccounts = {
		mint: tokenAddress,
		mintAuthority: signer
	};
	
	const dataArgs: CreateMetadataAccountV3InstructionDataArgs = {
		data: onChainMetadata,
		isMutable: true,
		collectionDetails: null
	};

	const transactionBuilder = createMetadataAccountV3(umi, {...accounts, ...dataArgs});
	const transaction = await transactionBuilder.buildAndSign(umi);
	console.log("Metadaten hinzugefügt, Transaktions:", transaction);

	const signature = await umi.rpc.sendTransaction(transaction);
    console.log("Metadaten hinzugefügt:", signature);
}