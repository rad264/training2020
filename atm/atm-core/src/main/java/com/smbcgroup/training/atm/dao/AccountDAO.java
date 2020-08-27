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
	
	void updateAccountTransactions(String accountNumber, Transaction transaction) throws AccountNotFoundException;
	
	void createAccount(String userId, String accountNumber) throws UserNotFoundException;

	void createUser(String userId);

}
