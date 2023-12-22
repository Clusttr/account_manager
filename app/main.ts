// import * as anchor from "@coral-xyz/anchor";
// import {Program} from "@coral-xyz/anchor";
// import { AccountManager } from "../target/types/account_manager";
//
// const provider = anchor.AnchorProvider.env()
// anchor.setProvider(provider);
// const payer = provider.wallet as anchor.Wallet
// const program = anchor.workspace.AccountManager as Program<AccountManager>;

async function main() {
    // console.log("Payer: ", payer.publicKey)
    console.log("Hello world")
}

main().then(() => {
    console.log("End of program")
}).catch(err => {
    console.log("Error: ", err)
})