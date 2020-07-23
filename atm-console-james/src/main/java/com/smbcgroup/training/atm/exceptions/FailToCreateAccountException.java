package com.smbcgroup.training.atm.exceptions;

public class FailToCreateAccountException extends Exception {
	
	private static final long serialVersionUID = 1L;
	
	public FailToCreateAccountException() {
		super();
	}
	
	public String toString() {
		return "Failed to Create Account.";
	}
}
