use anchor_lang::prelude::*;

pub mod instructions;
pub use instructions::*;
pub use instructions::{rent_vault, register_new_account};

declare_id!("4ghb7LAzcmr5PYNkz2tgyEsPHB7Q7vHtiRfLDiFNoDj6");

#[program]
pub mod account_manager {
    use super::*;

    pub fn fund_rend_vault(ctx: Context<FundRentVault>, fund_lamports: u64) -> Result<()> {
        rent_vault::fund_rend_vault(ctx, fund_lamports)
    }

    pub fn register_new_account(ctx: Context<RegisterAccount>) -> Result<()> {
        register_account::register_new_account(ctx)
    }
}
