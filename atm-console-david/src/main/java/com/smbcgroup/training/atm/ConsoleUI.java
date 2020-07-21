package com.smbcgroup.training.atm;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.math.BigDecimal;
import java.util.Calendar;
import java.util.LinkedList;

public class ConsoleUI implements UI {

	private BufferedReader inputReader;
	private PrintStream output;
	
	private ATMCore bizLogic;

	public ConsoleUI(ATMCore bizLogic) {
		this.bizLogic = bizLogic;
		inputReader = new BufferedReader(new InputStreamReader(System.in));
		output = System.out;
	}

	public void init() {
		output.println("Welcome");
	}

	public void exit() {
		output.println("Goodbye!");
		try {
			inputReader.close();
		} catch (IOException e) {
			output.print("Issue closing reader");
			e.printStackTrace();
		}
	}

	public void printErr(String error) {
		output.println(error);
	}

	public String getInput(Action selectedAction) {
		if (selectedAction == null) {
			output.println("What would you like to do?");
		} else {
			switch (selectedAction) {
			case login:
				output.println("Enter user ID:");
				break;
			case changeAccount:
				output.println(
						"Enter account number: (" + String.join(", ", bizLogic.getUserAccounts()) + ")");
				break;
			case deposit:
				output.println("How much would You like to deposit?");
				break;
			case withdraw:
				output.println("How much would You like to withdraw?");
				break;
			case addAccount:
				output.println("Input new account number");
				break;
			case transfer:
				output.println("Which account would you like to withdraw from? (" + String.join(", ", bizLogic.getUserAccounts()) + ")");
				break;
			case transfer2:
				output.println("Which account would you like to deposit to? (" + String.join(", ", bizLogic.getUserAccounts()) + ")");
				break;
			case transferAmt:
				output.println("How much would you like to transfer?");
			default:
				break;
			}
		}
		try {
			return inputReader.readLine();
		} catch (IOException e) {
			output.println("Invalid Input");
			return null;
		}
	}

	public void showBalance() {
		try {
			output.println("$" + bizLogic.getBalance());
		} catch (IOException e) {
			output.println("Can not check balance");
		}
	}
	
	public void showAccounts() {
		for (String userAccount : bizLogic.getUserAccounts()) {
			try {
				output.println(userAccount + " [$" + bizLogic.getBalance(userAccount) + "]");
			} catch (IOException e) {
				output.println("Can not check balance");
			}
		}
	}

	public void showSuccessfulBalanceUpdate(BigDecimal input, String account, BigDecimal currentBal, BigDecimal newBalance) {
		output.println("Successfully deposited $" + input + " to account " + account + "!");
		output.println("Balance Before: $" + currentBal);
		output.println("Balance After:  $" + newBalance + "\n");
	}

	@Override
	public void showHistory(LinkedList<Object[]> pairs) {
		for (Object[] pair: pairs) {
			Calendar date = (Calendar)pair[0];
			int amt = (int)pair[1];
			String dateStr = date.get(Calendar.MONTH) + "/" + 
							 date.get(Calendar.DAY_OF_MONTH) + "/" +
							 date.get(Calendar.YEAR) + " at " +
							 date.get(Calendar.HOUR) + ":" +
							 date.get(Calendar.MINUTE) + ":" +
							 date.get(Calendar.SECOND);
			System.out.println("[" + dateStr + "]: $" + amt);
		}
	}
}
