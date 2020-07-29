package com.smbcgroup.training.atm;

import java.math.BigDecimal;

public class Transfer {
	
	private String fromAccountNumber;
	private String toAccountNumber;
	private BigDecimal transferAmount;
	
	public Transfer(String fromAccountNumber, String toAccountNumber, BigDecimal transferAmount) {
		this.fromAccountNumber = fromAccountNumber;
		this.toAccountNumber = toAccountNumber;
		this.transferAmount = transferAmount;
	}
	
	public String getFromAccountNumber() {
		return fromAccountNumber;
	}
	
	public void setFromAccountNumber(String accountNumber) {
		this.fromAccountNumber = accountNumber;
	}
	
	public String getToAccountNumber() {
		return toAccountNumber;
	}
	
	public void setToAccountNumber(String accountNumber) {
		this.toAccountNumber = accountNumber;
	}
	
	public BigDecimal getTransferAmount() {
		return transferAmount;
	}
	
	public void setTransferAmount(BigDecimal amount) {
		this.transferAmount = amount;
	}
	
}
