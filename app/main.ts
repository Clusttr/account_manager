import {AnchorProvider, Idl, Program, Wallet, web3, BN} from "@coral-xyz/anchor";
import * as fs from "fs";
import idl from "../target/idl/account_manager.json";
import { AccountManager, IDL } from "../target/types/account_manager"
import {Keypair, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";

let solanaURL = "https://api.devnet.solana.com" // "http://localhost:8899"
function loadWalletKey(): web3.Keypair {
     return web3.Keypair.fromSecretKey(
         new Uint8Array(JSON.parse(fs.readFileSync("/Users/matthewchukwuemeka/.config/solana/id.json").toString()))
         // new Uint8Array()
     )
}
const connection = new web3.Connection(solanaURL)
const walletKeypair = loadWalletKey()
const wallet = new Wallet(walletKeypair)

const programId = new web3.PublicKey(idl.metadata.address)
let [vaultAddress] = PublicKey.findProgramAddressSync(
    [Buffer.from("rent_vault")],
    programId
)

async function main() {
    const provider = new AnchorProvider(connection, wallet, {})

    const program = new Program<AccountManager>(IDL, programId, provider)

    const vaultAccountInfo = await connection.getAccountInfo(vaultAddress)
    console.log("Vault Account: ", vaultAccountInfo)

    // await fundVault(1, vaultAddress, program)
    // await withdrawFromVault(0.5, program)

    const newAccount = Keypair.generate()
    console.log({publicKey: newAccount.publicKey.toBase58(), se: newAccount.secretKey})
    // await registerNewAccount(newAccount, program)

    const vaultAccountInfo2 = await connection.getAccountInfo(vaultAddress)
    console.log("Vault Account2: ", vaultAccountInfo2)

}

async function fundVault(amount: number, vault: PublicKey, program: Program<AccountManager>) {
    let fundAmount = new BN(LAMPORTS_PER_SOL * amount)
    const tx = await program.methods.fundRentVault(fundAmount)
        .accounts({
            payer: wallet.payer.publicKey,
            rentVault: vault
        })
        .rpc()

    console.log(`******${tx}*******`)
}

async function withdrawFromVault(amount: number, program: Program<AccountManager>) {
    let fundToWithdraw = new BN(LAMPORTS_PER_SOL * amount)
    const tx = await program.methods
        .withdrawRentVault(fundToWithdraw)
        .accounts({
            payer: wallet.payer.publicKey,
            rentVault: vaultAddress
        })
        .rpc()
    console.log(`***WithdrawFromVault***${tx}*******`)
}

async function registerNewAccount(account: Keypair, program: Program<AccountManager>) {
    const tx = await program.methods
        .registerNewAccount()
        .accounts({
            newAccount: account.publicKey,
            rentVault: vaultAddress
        })
        .signers([account])
        .rpc()

    console.log(`***RegisterNewAccount***${tx}*******`)
}

main()
  .then(() => {
      printLine("END OF PROGRAM")
  })
  .catch((err) => {
      printLine("END OF PROGRAM WITH ERROR")
      console.log("Error: ", err);
  });

function printLine(msg: string) {
    console.log(`-------------------------${msg}-------------------------`)
}