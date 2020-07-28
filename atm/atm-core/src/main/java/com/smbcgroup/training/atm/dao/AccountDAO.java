package com.smbcgroup.training.atm.dao;

import java.math.BigDecimal;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.User;

public interface AccountDAO {

	String[] getUserAccounts(String userId);
	BigDecimal getAccountBalance(String accountNumber);
	void updateAccountBalance(String accountNumber, BigDecimal balance);
	String createAccount(String userId);
	String getAccountHistory(String accountNumber);
	void appendAudit(String accountNumber, String action);
	
	User getUser(String userId) throws UserNotFoundException;

	Account getAccount(String accountNumber) throws AccountNotFoundException;

	void updateAccount(Account account);

}
