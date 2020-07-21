package com.smbcgroup.training.atm.dao;

import java.math.BigDecimal;

public interface AccountDAO {

	String[] getUserAccounts(String userId);

	BigDecimal getAccountBalance(String accountNumber);
	
	String[] getUserTransactions(String userId);

	void updateAccountBalance(String accountNumber, BigDecimal balance);

	void updateUserTransactions(String userId, String accountNumber, BigDecimal amount, String type, String sign);

	void clearUserTransactions(String userId);

	void createAccount(String userId, String accountNumber);

}
