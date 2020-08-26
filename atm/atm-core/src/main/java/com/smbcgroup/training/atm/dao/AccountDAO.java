package com.smbcgroup.training.atm.dao;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.Transaction;
import com.smbcgroup.training.atm.User;

public interface AccountDAO {

	User getUser(String userId) throws UserNotFoundException;

	Account getAccount(String userId, String accountNumber) throws AccountNotFoundException, UserNotFoundException; // user

	Account[] getAccounts(String userId) throws UserNotFoundException;

	void updateAccount(Account account); // user

	Transaction[] getAccountTransactions(String userId, String accountNumber) throws AccountNotFoundException, UserNotFoundException; // user

	void updateAccountTransactions(String userId, String accountNumber, Transaction transaction) throws AccountNotFoundException, UserNotFoundException; // user

	void createAccount(String userId, String accountNumber) throws UserNotFoundException;

	void createUser(String userId);

}
