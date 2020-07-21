package com.smbcgroup.training.atm;

import java.io.IOException;
import java.math.BigDecimal;

public interface ATMCore {

	public String[] getUserAccounts(); 
	public BigDecimal getBalance() throws IOException;
	public BigDecimal getBalance(String account) throws IOException;
}
