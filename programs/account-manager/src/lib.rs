use anchor_lang::prelude::*;

pub mod instructions;
pub use instructions::*;
pub use instructions::{rent_vault, register_new_account};

declare_id!("4ghb7LAzcmr5PYNkz2tgyEsPHB7Q7vHtiRfLDiFNoDj6");

#[program]
pub mod account_manager {
    use super::*;

    pub fn fund_rent_vault(ctx: Context<FundRentVault>, fund_lamports: u64) -> Result<()> {
        rent_vault::fund_rent_vault(ctx, fund_lamports)
    }

    pub fn withdraw_rent_vault(ctx: Context<WithdrawRentVault>, withdraw_lamports: u64) -> Result<()> {
        rent_vault::withdraw_rent_vault(ctx, withdraw_lamports)
    }

    pub fn register_new_account(ctx: Context<RegisterAccount>) -> Result<()> {
        register_account::register_new_account(ctx)
    }

}
