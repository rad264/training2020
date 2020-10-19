package com.smbcgroup.training.atm.dao;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.Logger;
import com.smbcgroup.training.atm.User;
import java.math.BigDecimal;
import java.util.List;

public interface AccountDAO {

	User getUser(String userId) throws UserNotFoundException;

	Account getAccount(String accountNumber) throws AccountNotFoundException;

	void updateAccount(Account account);
		
	void writeAccountLog(String accountNumber, String transaction, BigDecimal amount) throws AccountNotFoundException; 
	
	void deposit(String accountNumber, BigDecimal amount) throws AccountNotFoundException;
	
	void withdraw(String accountNumber, BigDecimal amount) throws AccountNotFoundException, InsufficientBalanceException;

	void createAccount(String userId, Account account) throws UserNotFoundException;
	
	List<Logger> getAccountLogs(String accountNumber) throws AccountNotFoundException;
}
