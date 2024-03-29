/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita-swift
 */
import Foundation
import Beet
import Solana

/**
 * @category Instructions
 * @category RegisterNewAccount
 * @category generated
 */
public struct RegisterNewAccountInstructionArgs{
    let instructionDiscriminator: [UInt8] /* size: 8 */
    

    public init(
        instructionDiscriminator: [UInt8] /* size: 8 */ = registerNewAccountInstructionDiscriminator
    ) {
        self.instructionDiscriminator = instructionDiscriminator
    }
}
/**
 * @category Instructions
 * @category RegisterNewAccount
 * @category generated
 */
public let registerNewAccountStruct = FixableBeetArgsStruct<RegisterNewAccountInstructionArgs>(
    fields: [
        ("instructionDiscriminator", Beet.fixedBeet(.init(value: .collection(UniformFixedSizeArray<UInt8>(element: .init(value: .scalar(u8())), len: 8))))),
        
    ],
    description: "RegisterNewAccountInstructionArgs"
)
/**
* Accounts required by the _registerNewAccount_ instruction
*
* @property [_writable_, **signer**] newAccount  
* @property [_writable_] rentVault   
* @category Instructions
* @category RegisterNewAccount
* @category generated
*/
public struct RegisterNewAccountInstructionAccounts {
    let newAccount: PublicKey
    let rentVault: PublicKey
    let systemProgram: PublicKey?

    public init(
        newAccount: PublicKey,
        rentVault: PublicKey,
        systemProgram: PublicKey? = nil
    ) {
        self.newAccount = newAccount
        self.rentVault = rentVault
        self.systemProgram = systemProgram
    }
}

public let registerNewAccountInstructionDiscriminator = [205, 141, 161, 182, 124, 81, 22, 21] as [UInt8]

/**
* Creates a _RegisterNewAccount_ instruction.
*
* @param accounts that will be accessed while the instruction is processed
* @category Instructions
* @category RegisterNewAccount
* @category generated
*/
public func createRegisterNewAccountInstruction(accounts: RegisterNewAccountInstructionAccounts, 
programId: PublicKey=PublicKey(string: "4ghb7LAzcmr5PYNkz2tgyEsPHB7Q7vHtiRfLDiFNoDj6")!) -> TransactionInstruction {

    let data = registerNewAccountStruct.serialize(
            instance: ["instructionDiscriminator": registerNewAccountInstructionDiscriminator ])

    let keys: [AccountMeta] = [
        AccountMeta(
            publicKey: accounts.newAccount,
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