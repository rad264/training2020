package com.smbcgroup.training.atm.ATM;

import java.io.IOException;

import com.smbcgroup.training.atm.console.ConsoleATM;

public class ATM {
	
	public static void main(String[] args) throws IOException {
		new ConsoleATM().beginSession();
	}
	
}
