package com.smbcgroup.training.atm;

import java.io.IOException;
import java.math.BigDecimal;

public interface AccountDAO {
	
	public void changeDataLocation(String location);
	
	public String[] getUserAccounts(String userId);
	
	public BigDecimal getAccountBalance(String accountNumber);
	
	public void depositIntoAccount(String currentAccount, BigDecimal depositAmount);
	
	public void withdrawFromAccount(String currentAccount, BigDecimal withdrawalAmount);
	
	public void createNewAccount(String userId) throws IOException;
	
	public String getSummary(String userId);
	
	public void logTransaction(String userId, String transactionDetails) throws IOException;
	
	public String getTransactionHistory(String userId) throws IOException;
	
	public String resourceToString(String fileName) throws IOException;
	
}