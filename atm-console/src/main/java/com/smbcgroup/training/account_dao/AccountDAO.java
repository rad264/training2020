package com.smbcgroup.training.account_dao;

import java.math.BigDecimal;

public interface AccountDAO {
	String[] getUserAccounts(String userId);
	BigDecimal getAccountBalance(String accountNumber);
	void updateAccountBalance(String accountNumber, BigDecimal balance);
	String createAccount(String userId);
	String getAccountHistory(String accountNumber);
	void appendAudit(String accountNumber, String action);
}
