package com.smbcgroup.training.atm;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;

public class AccountDAOTxtFileImpl implements AccountDAO {

	@Override
	public String resourceToString(String fileName) throws IOException {
		return Files.readString(Path.of(fileName + ".txt"));
	}
	
	@Override
	public void stringToResource(String fileName, String addition) throws IOException {
		Files.write(Path.of(fileName + ".txt"), addition.getBytes(), StandardOpenOption.APPEND);
	}
	
	@Override
	public void stringToResourceReplace(String fileName, String addition) throws IOException {
		Files.write(Path.of(fileName + ".txt"), addition.getBytes(), StandardOpenOption.WRITE);
	}
	
	@Override
	public void createFile(String path, String fileName) throws IOException {
		Files.createFile(Paths.get(path + fileName + ".txt"));
	}

}
