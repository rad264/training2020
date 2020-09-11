package com.smbcgroup.training.atm;

import java.io.IOException;

public interface AccountDAO {
	public String resourceToString(String fileName) throws IOException;
	
	public void stringToResource(String fileName, String addition) throws IOException;
	
	public void stringToResourceReplace(String fileName, String addition) throws IOException;
	
	public void createFile(String path, String fileName) throws IOException;
}
