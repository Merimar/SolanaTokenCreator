import { createNFT, createToken, revokeMintAuthority, privateKeyToUINT8Array, UINT8ArrayToPrivateKey } from "./utils"
import * as VARS from "./settings"
import secret from "./id.json"

async function main() {
	//Create NFT token 
	//await createNFT(secret, VARS.connection, "Token Name", "Token URI", 0)

	//Create Fungigle Token
	//await createToken(secret, VARS.connection, VARS.rpcEndpoint, VARS.onChainMetadata)

	//Revoke Mint Authority
	//revokeMintAuthority(secret, VARS.connection, VARS.tokenAddress)
	
	//Get UINT8 Array
	//privateKeyToUINT8Array("")

	//Get Private Key
	//UINT8ArrayToPrivateKey(new Uint8Array(secret))
}

main();