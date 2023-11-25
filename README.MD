# Solana Token Create

Projekt erstellt von **Merimar** :shipit:

## Disclaimer

> [!WARNING]
> Erstellen der Tokens auf eigene Gefahr, der Ersteller übernimmt keine Verantwortung für das Erstellen der Tokens!

## Anleitung

Um die Tokens zu erstellen kannst du die Funktionen aus der Utils Klasse benutzen.

_Erstellen eines NFT's_

> ``` await createNFT(secret, connection, "Token Name", "Token URI", 0); ```

_Erstellen eines Tokens_

> ``` await createToken(secret, connection, "https://api.devnet.solana.com", onChainMetadata); ```