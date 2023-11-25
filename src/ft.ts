import { PublicKey, publicKey } from "@metaplex-foundation/umi-public-keys";
import { createNoopSigner, signerIdentity, createNullContext, Context, createNullTransactionFactory, createSignerFromKeypair, keypairIdentity } from "@metaplex-foundation/umi";
import { Connection, clusterApiUrl, Keypair, sendAndConfirmTransaction, PublicKey as pkey } from "@solana/web3.js";
import * as splToken from "@solana/spl-token";
import { CreateMetadataAccountV3InstructionAccounts, CreateMetadataAccountV3InstructionDataArgs, DataV2Args, createMetadataAccountV3 } from "@metaplex-foundation/mpl-token-metadata";
import secret from "./id.json"
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';

const umi = createUmi("https://api.devnet.solana.com");
const connection = new Connection(clusterApiUrl("devnet"));
const wallet = Keypair.fromSecretKey(new Uint8Array(secret));
// const tokenAddress = publicKey("FmwX7oLThaKFm2sVCTwr8z2UKJB6PZ31XSbVJnp3tTUs");
const myPublicKey = publicKey("4t21KYbwfurXcx5AYbPVEe3nCCPmG8fijNXLxy8oGd7m");
const myKeypair = umi.eddsa.createKeypairFromSecretKey(wallet.secretKey);

const signer = createSignerFromKeypair(umi, myKeypair);
umi.use(keypairIdentity(signer));

function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function main() {
	const token = await splToken.createMint(connection, wallet, wallet.publicKey, null, 9);
	const tokenAddress = publicKey(token);
	console.log("Token created: ", tokenAddress);
	console.log("Waiting 5 seconds:");

	await sleep(5000);

	console.log("Setting metadata ...");

	await sleep(1000);

	const onChainMetadata = {
		name: "Wuhuuu Token",
		symbol: "WTK",
		uri: "https://kuy6ey6galpez5c7f4wsdcoi5xxf75jmlds2mawn3sqop2iff6oq.arweave.net/VTHiY8YC3kz0Xy8tIYnI7e5f9SxY5aYCzdyg5-kFL50",
		sellerFeeBasisPoints: 0,
		creators: null,
		collection: null,
		uses: null
	} as DataV2Args;
	
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

main();