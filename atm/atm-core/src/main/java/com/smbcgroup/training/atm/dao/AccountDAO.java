package com.smbcgroup.training.atm.dao;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.Transaction;
import com.smbcgroup.training.atm.User;

public interface AccountDAO {

	User getUser(String userId) throws UserNotFoundException;

	Account getAccount(String accountNumber) throws AccountNotFoundException;

	Account[] getAccounts(String userId) throws UserNotFoundException;

	void updateAccount(Account account);

	Transaction[] getAccountTransactions(String accountNumber) throws AccountNotFoundException;

//	String[] getUserAccounts(String userId);
//
//	BigDecimal getAccountBalance(String accountNumber);
//	
//	String[] getUserTransactions(String userId);
//
//	void updateAccountBalance(String accountNumber, BigDecimal balance);
//
//	void updateUserTransactions(String userId, String accountNumber, BigDecimal amount, String type, String sign);
//
//	void clearUserTransactions(String userId);
//
	void createAccount(String userId, String accountNumber);

}
