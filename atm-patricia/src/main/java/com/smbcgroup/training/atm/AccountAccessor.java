package com.smbcgroup.training.atm;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.sql.Timestamp;

public class AccountAccessor {
	
	public static void logging(String homeAccount, String destinationAccount, String newBalance, String amount, String transactionType) throws IOException {
		switch (transactionType) {
		case "withdraw":
			stringToResourceReplace("data/accounts/" + homeAccount, newBalance);
			stringToResource("data/accounts/" + homeAccount+"history", logTime() + " -" + amount + " | Balance: " + newBalance + "\n");
			return;
		case "deposit":
			stringToResourceReplace("data/accounts/" + homeAccount, newBalance);
			stringToResource("data/accounts/" + homeAccount+"history", logTime() + " +" + amount + " | Balance: " + newBalance + "\n");
			return;
		case "transferPartOne":
			stringToResource("data/accounts/" + homeAccount+"history", logTime() + " --- TRANSFER TO ACCOUNT #" + destinationAccount + "\n");
			stringToResource("data/accounts/" + destinationAccount+"history", logTime() + " --- TRANSFER FROM ACCOUNT #" + homeAccount + "\n");
			return;
		case "transferPartTwo":
			stringToResource("data/accounts/" + homeAccount+"history", logTime() + " ---"+"\n");
			stringToResource("data/accounts/" + destinationAccount+"history", logTime() + " ---"+"\n");
			return;
		}
	}
	
	public static void accountFileCreation(String newAccount) throws IOException {
		Files.createFile(Paths.get("data/accounts/" + newAccount + ".txt"));
		stringToResource("data/accounts/" + newAccount, "0.00\n");
		Files.createFile(Paths.get("data/accounts/" + newAccount + "history.txt"));
		stringToResource("data/accounts/" + newAccount + "history", new Timestamp(System.currentTimeMillis()) + " Account creation - 0.00\n");
	}

	public static String resourceToString(String fileName) throws IOException {
		return Files.readString(Path.of(fileName + ".txt"));
	}
	
	public static void stringToResource(String fileName, String addition) throws IOException {
		Files.write(Path.of(fileName + ".txt"), addition.getBytes(), StandardOpenOption.APPEND);
	}
	
	private static void stringToResourceReplace(String fileName, String addition) throws IOException {
		Files.write(Path.of(fileName + ".txt"), addition.getBytes(), StandardOpenOption.WRITE);
	}
	
	private static Timestamp logTime() {
		return new Timestamp(System.currentTimeMillis());
	}

}
