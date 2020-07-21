package com.smbcgroup.training.account_dao;

import java.math.BigDecimal;

import com.smbcgroup.training.account_accessor.AccountAccessor;

public class AccountDAOStaticImpl implements AccountDAO{

	@Override
	public String[] getUserAccounts(String userId) {
		return AccountAccessor.getUserAccounts(userId);
	}

	@Override
	public BigDecimal getAccountBalance(String accountNumber) {
		return AccountAccessor.getAccountBalance(accountNumber);
	}

	@Override
	public void updateAccountBalance(String accountNumber, BigDecimal balance) {
		AccountAccessor.updateAccountBalance(accountNumber, balance);
	}

	@Override
	public String getAccountHistory(String accountNumber) {
		return AccountAccessor.getAccountHistory(accountNumber);
	}

	@Override
	public void appendAudit(String accountNumber, String action) {
		AccountAccessor.appendAudit(accountNumber, action);
	}

	@Override
	public String createAccount(String userId) {
		return AccountAccessor.createNewAccount(userId);
	}

}
