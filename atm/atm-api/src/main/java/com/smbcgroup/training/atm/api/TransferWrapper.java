package com.smbcgroup.training.atm.api;

import java.math.BigDecimal;

public class TransferWrapper {
	public String homeAccount;
	public String destinationAccount;
	public BigDecimal amount;
	
	public String getHomeAccount() {
		return homeAccount;
	}
	public void setHomeAccount(String homeAccount) {
		this.homeAccount = homeAccount;
	}
	public String getDestinationAccount() {
		return destinationAccount;
	}
	public void setDestinationAccount(String destinationAccount) {
		this.destinationAccount = destinationAccount;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	
	
}
