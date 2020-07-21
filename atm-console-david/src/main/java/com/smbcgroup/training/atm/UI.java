package com.smbcgroup.training.atm;

import java.math.BigDecimal;
import java.util.LinkedList;

public interface UI {

	public void init();
	public void exit();
	
	public String getInput(Action selectedAction);

	public void printErr(String message);
	
	public void showBalance();
	public void showAccounts();
	public void showSuccessfulBalanceUpdate(BigDecimal input, String account, BigDecimal currentBal, BigDecimal newBalance);
	public void showHistory(LinkedList<Object[]> pairs);

}
