package com.smbcgroup.training.atm.exceptions;

public class AccountAlreadyExistsException extends Exception {
	
	private static final long serialVersionUID = 1L;
	
	public AccountAlreadyExistsException() {
		super();
	}
	
	public String toString() {
		return "Account Already Exists.";
	}
}
