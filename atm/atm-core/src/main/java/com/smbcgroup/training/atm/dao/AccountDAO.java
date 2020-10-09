package com.smbcgroup.training.atm.dao;

import java.math.BigDecimal;
import java.util.List;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.User;

public interface AccountDAO {
	User getUser(String userId) throws UserNotFoundException;
	
	Account getAccount(String accountNumber) throws AccountNotFoundException;
	
	List<String> getUserAccounts(String userId) throws UserNotFoundException;
	
	BigDecimal getAccountBalance(String accountNumber) throws AccountNotFoundException;
		
	void updateAccount(Account account);
		
	String addNewAccount(String userId) throws UserNotFoundException;
	
	void updateLogs(String accountNumber, BigDecimal depositAmount, String transactionType) throws AccountNotFoundException;


}
