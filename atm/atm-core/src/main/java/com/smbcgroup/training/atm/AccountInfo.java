package com.smbcgroup.training.atm;

public class AccountInfo {
	private String userId;
	private String accountType;

	public AccountInfo() {
		
	}

	public AccountInfo(String userId, String accountType) {
		this.userId = userId;
		this.accountType = accountType;
	}

	public String getUserId() {
		return userId;
	}
	
	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	public String getAccountType() {
		return accountType;
	}
	
	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

}
