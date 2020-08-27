package com.smbcgroup.training.atm.dao;

public class NegativeAmountException extends Exception {
	
	private static final long serialVersionUID = 1L;
	
	public NegativeAmountException() {
		super();
	}

	public NegativeAmountException(String message, Throwable cause) {
		super(message, cause);
	}

}
