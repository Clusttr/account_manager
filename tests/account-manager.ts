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
        .fundRendVault(fundAmount)
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
});
