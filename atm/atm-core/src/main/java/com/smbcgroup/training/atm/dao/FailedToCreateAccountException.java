package com.smbcgroup.training.atm.dao;

public class FailedToCreateAccountException extends Exception {
	private static final long serialVersionUID = 1L;
	
	public FailedToCreateAccountException() {
		super();
	}
	
	public FailedToCreateAccountException(String message, Throwable cause) {
		super(message, cause);
	}

}
