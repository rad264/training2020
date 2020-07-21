package com.smbcgroup.training.atm;

import java.io.IOException;
import java.math.BigDecimal;

public class MockATM implements ATMCore{
	
	public String[] getUserAccounts() {
		return new String[]{"111111", "123456"};
	}

	public BigDecimal getBalance() throws IOException {
		return new BigDecimal(100);
	}

	public BigDecimal getBalance(String account) {
		return new BigDecimal(100);
	}
	
	
}
