import { Metaplex, keypairIdentity, toMetaplexFileFromJson  } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, PublicKey, Keypair } from "@solana/web3.js";
import secret from "./id.json"

const connection = new Connection(clusterApiUrl("devnet"));
const wallet = Keypair.fromSecretKey(new Uint8Array(secret));
const metaplex = Metaplex.make(connection).use(keypairIdentity(wallet))

async function main() {

	const { nft } = await metaplex.nfts().create({
		uri: "https://7eikdt2gl4pzuhrexgrdxopmxe76ppqsy3iciln73dcfn7si7dbq.arweave.net/-RChz0ZfH5oeJLmiO7nsuT_nvhLG0CQtv9jEVv5I-MM",
		name: "Nestletoken",
		sellerFeeBasisPoints: 500
	});


console.log(nft);
}

main();