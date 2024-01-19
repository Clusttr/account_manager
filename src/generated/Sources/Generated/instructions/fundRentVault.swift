/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita-swift
 */
import Foundation
import Solana
import Beet

/**
 * @category Instructions
 * @category FundRentVault
 * @category generated
 */
public struct FundRentVaultInstructionArgs{
    let instructionDiscriminator: [UInt8] /* size: 8 */
    let fundLamports: UInt64

    public init(
        instructionDiscriminator: [UInt8] /* size: 8 */ = fundRentVaultInstructionDiscriminator,
        fundLamports: UInt64
    ) {
        self.instructionDiscriminator = instructionDiscriminator
        self.fundLamports = fundLamports
    }
}
/**
 * @category Instructions
 * @category FundRentVault
 * @category generated
 */
public let fundRentVaultStruct = FixableBeetArgsStruct<FundRentVaultInstructionArgs>(
    fields: [
        ("instructionDiscriminator", Beet.fixedBeet(.init(value: .collection(UniformFixedSizeArray<UInt8>(element: .init(value: .scalar(u8())), len: 8))))),
        ("fundLamports", Beet.fixedBeet(.init(value: .scalar(u64()))))
    ],
    description: "FundRentVaultInstructionArgs"
)
/**
* Accounts required by the _fundRentVault_ instruction
*
* @property [_writable_, **signer**] payer  
* @property [_writable_] rentVault   
* @category Instructions
* @category FundRentVault
* @category generated
*/
public struct FundRentVaultInstructionAccounts {
    let payer: PublicKey
    let rentVault: PublicKey
    let systemProgram: PublicKey?

    public init(
        payer: PublicKey,
        rentVault: PublicKey,
        systemProgram: PublicKey? = nil
    ) {
        self.payer = payer
        self.rentVault = rentVault
        self.systemProgram = systemProgram
    }
}

public let fundRentVaultInstructionDiscriminator = [244, 253, 189, 13, 179, 95, 31, 3] as [UInt8]

/**
* Creates a _FundRentVault_ instruction.
*
* @param accounts that will be accessed while the instruction is processed
  * @param args to provide as instruction data to the program
 * 
* @category Instructions
* @category FundRentVault
* @category generated
*/
public func createFundRentVaultInstruction(accounts: FundRentVaultInstructionAccounts, 
args: FundRentVaultInstructionArgs, programId: PublicKey=PublicKey(string: "4ghb7LAzcmr5PYNkz2tgyEsPHB7Q7vHtiRfLDiFNoDj6")!) -> TransactionInstruction {

    let data = fundRentVaultStruct.serialize(
            instance: ["instructionDiscriminator": fundRentVaultInstructionDiscriminator,
"fundLamports": args.fundLamports])

    let keys: [AccountMeta] = [
        AccountMeta(
            publicKey: accounts.payer,
            isSigner: true,
            isWritable: true
        ),
        AccountMeta(
            publicKey: accounts.rentVault,
            isSigner: false,
            isWritable: true
        ),
        AccountMeta(
            publicKey: accounts.systemProgram ?? PublicKey.systemProgramId,
            isSigner: false,
            isWritable: false
        )
    ]

    let ix = TransactionInstruction(
                keys: keys,
                programId: programId,
                data: data.0.bytes
            )
    return ix
}