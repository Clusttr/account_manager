import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AccountManager } from "../target/types/account_manager";
import {Keypair, LAMPORTS_PER_SOL, PublicKey} from "@solana/web3.js";
import {assert} from "chai";

describe("account-manager", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider);

  const payer = provider.wallet as anchor.Wallet
  const program = anchor.workspace.AccountManager as Program<AccountManager>;

    const [vaultAccount] = PublicKey.findProgramAddressSync(
        [Buffer.from("rent_vault")],
        program.programId
    )


  it("fund rent vault", async () => {

    const fundAmount = new anchor.BN(LAMPORTS_PER_SOL)
      await program.methods
        .fundRentVault(fundAmount)
        .accounts({
          payer: payer.publicKey,
          rentVault: vaultAccount
        })
        .signers([payer.payer])
        .rpc();

    //Check rent vault
      const accountInfo = await program.provider.connection.getAccountInfo(vaultAccount)
      console.log("Vault Account Info:", accountInfo)
  });

  it("register a new account using rent vault", async () => {
      const newAccount = new Keypair()

      await program.methods
          .registerNewAccount()
          .accounts({
              rentVault: vaultAccount,
              newAccount: newAccount.publicKey
          })
          .signers([newAccount])
          .rpc()

      const connection = program.provider.connection
      const minRentFreeLamports = await connection.getMinimumBalanceForRentExemption(0)
      const accountInfo = await connection.getAccountInfo(newAccount.publicKey)

      assert(minRentFreeLamports == accountInfo.lamports)
  })

    it("withdraw from rent vault", async () => {
        const withdrawAmount = new anchor.BN(LAMPORTS_PER_SOL)
        const connection = program.provider.connection

        const vaultInfo1 = await connection.getAccountInfo(vaultAccount)

        await program.methods
            .withdrawRentVault(withdrawAmount)
            .accounts({
                payer: payer.publicKey,
                rentVault: vaultAccount
            })
            .signers([payer.payer])
            .rpc()

        const vaultInfo2 = await connection.getAccountInfo(vaultAccount)

        console.log("vaultInfo1: ", vaultInfo1.lamports)
        console.log("vaultInfo2: ", vaultInfo2.lamports)

        console.assert(vaultInfo1.lamports > vaultInfo2.lamports)
    })
});
