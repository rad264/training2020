package com.smbcgroup.training.atm.dao;

public class AccountAlreadyExistsException extends Exception {
	
	private static final long serialVersionUID = 1L;
	
	public AccountAlreadyExistsException() {
		super();
	}
	
	public AccountAlreadyExistsException(String message, Throwable cause) {
		super(message, cause);
	}
}
