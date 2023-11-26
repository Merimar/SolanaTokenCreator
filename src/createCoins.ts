import { createNFT, createToken } from "./utils";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import { DataV2Args } from "@metaplex-foundation/mpl-token-metadata";

//Set these variables
import secret from "./id.json"
const connection = new Connection(clusterApiUrl("devnet"));
const onChainMetadata = {
	name: "Wuhuuu Token",
	symbol: "WTK",
	uri: "",
	sellerFeeBasisPoints: 0,
	creators: null,
	collection: null,
	uses: null
} as DataV2Args;

async function main() {
	//Create NFT token 
	await createNFT(secret, connection, "Token Name", "Token URI", 0);

	//Create Fungigle Token
	await createToken(secret, connection, "https://api.devnet.solana.com", onChainMetadata);
}

main();