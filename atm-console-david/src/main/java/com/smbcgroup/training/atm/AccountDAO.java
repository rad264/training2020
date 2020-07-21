package com.smbcgroup.training.atm;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.LinkedList;

public interface AccountDAO {

	public String[] getUserAccounts(String userId);
	
	public BigDecimal getAccountBalance(String accountNumber) throws IOException;
	public void 	  setAccountBalance(String accountNumber, BigDecimal newBalance) throws IOException;

	public void createAccount(String user, String accountNum) throws IOException;

	public void addStamp(String account, BigDecimal input, long currentTimeMillis);
	public LinkedList<Object[]> getHistory(String account);
	
}
