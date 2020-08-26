package com.smbcgroup.training.atm;

public class User {

	private String userId;
	private String[] accounts;
	private String[] transactions;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String[] getAccounts() {
		return accounts;
	}

	public void setAccounts(String[] accounts) {
		this.accounts = accounts;
	}
	
	public String[] getTransactions() {
		return transactions;
	}

	public void setTransactions(String[] transactions) {
		this.transactions = transactions;
	}

}
