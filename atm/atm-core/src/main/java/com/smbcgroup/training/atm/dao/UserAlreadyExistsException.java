package com.smbcgroup.training.atm.dao;

public class UserAlreadyExistsException extends Exception {
	private static final long serialVersionUID = 1L;
	
	public UserAlreadyExistsException() {
		super();
	}
	
	public UserAlreadyExistsException(String message, Throwable cause) {
		super(message, cause);
	}

}
