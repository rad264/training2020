package com.smbcgroup.training.atm.exceptions;

public class AccountNotFoundException extends Exception {

	private static final long serialVersionUID = 1L;
	
	public AccountNotFoundException() {
		super();
	}
	
	public String toString() {
		return "Account Not Found.";
	}
}
