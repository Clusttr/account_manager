use anchor_lang::prelude::*;
use anchor_lang::system_program::{transfer, Transfer};
use crate::instructions::constants::constants;

#[derive(Accounts)]
pub struct FundRentVault<'info> {
    #[account(mut)]
    payer: Signer<'info>,

    #[account(mut, seeds = [constants::VAULT_SEED], bump)]
    rent_vault: SystemAccount<'info>,
    system_program: Program<'info, System>
}

pub fn fund_rend_vault(ctx: Context<FundRentVault>, fund_lamport: u64) -> Result<()> {
    transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer{
                from: ctx.accounts.payer.to_account_info(),
                to: ctx.accounts.rent_vault.to_account_info()
            }
        ),
        fund_lamport
    )
}