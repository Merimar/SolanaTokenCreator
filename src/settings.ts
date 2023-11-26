import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import { DataV2Args } from "@metaplex-foundation/mpl-token-metadata";

//Set these variables
export const connection = new Connection(clusterApiUrl("devnet"))
export const rpcEndpoint = "https://api.devnet.solana.com"
export const tokenAddress = ""
export const onChainMetadata = {
	name: "Token Name",
	symbol: "Token Symbol",
	uri: "Token URI Address",
	sellerFeeBasisPoints: 100,
	creators: null,
	collection: null,
	uses: null
} as DataV2Args