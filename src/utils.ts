import { Metaplex, keypairIdentity } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import secret from "./id.json"

async function createNFT(parClusterName = "devnet", name:string, uri: string, sellerFeeBasisPoints:number = 0) {
	const connection = new Connection(clusterApiUrl("devnet"));
	const wallet = Keypair.fromSecretKey(new Uint8Array(secret));
	const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet))

	console.log("Creating NFT ...");

	const { nft } = await metaplex.nfts().create({
		uri: uri,
		name: name,
		sellerFeeBasisPoints: sellerFeeBasisPoints
	});

	console.log("NFT created!");
	console.log("Details:", nft);
}

