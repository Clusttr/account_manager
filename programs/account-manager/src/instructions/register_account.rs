use anchor_lang::prelude::*;
use anchor_lang::system_program::{create_account, CreateAccount};
use crate::instructions::constants::constants;

#[derive(Accounts)]
pub struct RegisterAccount<'info> {
    #[account(mut)]
    new_account: Signer<'info>,
    #[account(mut, seeds = [constants::VAULT_SEED], bump)]
    rent_vault: SystemAccount<'info>,
    system_program: Program<'info, System>
}

pub fn register_new_account(ctx: Context<RegisterAccount>) -> Result<()> {
    let signer: &[&[&[u8]]] = &[&[constants::VAULT_SEED, &[*ctx.bumps.get("rent_vault").unwrap()]]];
    let lamport = (Rent::get()?).minimum_balance(0);

    create_account(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            CreateAccount{
                from: ctx.accounts.rent_vault.to_account_info(),
                to: ctx.accounts.new_account.to_account_info()
            }
        ).with_signer(signer),
        lamport,
        0,
        &ctx.accounts.system_program.key()
    )?;

    Ok(())
}