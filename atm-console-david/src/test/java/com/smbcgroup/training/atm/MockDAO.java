package com.smbcgroup.training.atm;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedList;

public class MockDAO implements AccountDAO{

	@Override
	public String[] getUserAccounts(String userId) {
		return new String[]{"123456", "111111", "222222"};
	}

	@Override
	public BigDecimal getAccountBalance(String accountNumber) throws IOException {
		return new BigDecimal(100);
	}

	@Override
	public void setAccountBalance(String accountNumber, BigDecimal newBalance) throws IOException {
		return;
	}

	@Override
	public void createAccount(String user, String accountNum) throws IOException {
		return;
	}

	@Override
	public void addStamp(String account, BigDecimal input, long currentTimeMillis) {
		return;
	}

	@Override
	public LinkedList<Object[]> getHistory(String account) {
		LinkedList<Object[]> history = new LinkedList<>();

		Calendar c1 = Calendar.getInstance();
		c1.setTime(new Date(1595259995448l));
		history.add(new Object[] {c1, 100});

		Calendar c2 = Calendar.getInstance();
		c2.setTime(new Date(1595259995448l));
		history.add(new Object[] {c2, 100});

		Calendar c3 = Calendar.getInstance();
		c3.setTime(new Date(1595259995448l));
		history.add(new Object[] {c3, 100});

		Calendar c4 = Calendar.getInstance();
		c4.setTime(new Date(1595259995448l));
		history.add(new Object[] {c4, 100});
		return history;
	}

}
