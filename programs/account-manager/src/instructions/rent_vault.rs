use anchor_lang::prelude::*;
use std::str::FromStr;
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

pub fn fund_rent_vault(ctx: Context<FundRentVault>, fund_lamport: u64) -> Result<()> {
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

#[derive(Accounts)]
pub struct WithdrawRentVault<'info> {
    #[account(
        mut,
        address = Pubkey::from_str("9831HW6Ljt8knNaN6r6JEzyiey939A2me3JsdMymmz5J").unwrap()
    )]
    payer: Signer<'info>,

    #[account(mut, seeds =[constants::VAULT_SEED], bump)]
    rent_vault: SystemAccount<'info>,
    system_program: Program<'info, System>
}

pub fn withdraw_rent_vault(ctx: Context<WithdrawRentVault>, withdraw_lamport: u64) -> Result<()> {
    let signer: &[&[&[u8]]] = &[&[constants::VAULT_SEED, &[*ctx.bumps.get("rent_vault").unwrap()]]];
    transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.rent_vault.to_account_info(),
                to: ctx.accounts.payer.to_account_info(),
            }
        ).with_signer(signer),
        withdraw_lamport
    )
}