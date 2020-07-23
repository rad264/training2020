package com.smbcgroup.training.atm.dao;

public class FailToCreateAccountException extends Exception {
	
	private static final long serialVersionUID = 1L;
	
	public FailToCreateAccountException() {
		super();
	}
	
	public String toString() {
		return "Failed to Create Account.";
	}
}
