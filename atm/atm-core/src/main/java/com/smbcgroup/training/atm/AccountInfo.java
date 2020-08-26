package com.smbcgroup.training.atm;

public class AccountInfo {
	private String userId;
	private String accountNumber;

	public AccountInfo() {
		
	}

	public AccountInfo(String userId, String accountNumber) {
		this.userId = userId;
		this.accountNumber = accountNumber;
	}

	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getAccountNumber() {
		return accountNumber;
	}
	
	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}
}