package com.smbcgroup.training.atm.dao;

public class InsufficientBalanceException extends Exception {
	private static final long serialVersionUID = 1L;
	
	public InsufficientBalanceException() {
		super();
	}
	
	public InsufficientBalanceException(String message, Throwable cause ) {
		super(message, cause);
	}
}
