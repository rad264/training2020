package com.smbcgroup.training.atm.dao.jpa;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.smbcgroup.training.atm.User;

@Entity
@Table(name = "Users")

public class UserEntity {
	@Id
	@Column(name = "user_id")
	private String id;
	
	@OneToMany(mappedBy = "user")
	private List<AccountEntity> accounts;

	public UserEntity() {
		
	}
	
	public UserEntity(String id) {
		this.id = id;
		this.accounts = new ArrayList<AccountEntity>();
	}
	
	public User convertToUser() {
		User user = new User();
		user.setUserId(id);
		user.setAccounts(accounts.stream().map(AccountEntity::getAccountNumber).toArray(String[]::new));
		return user;
	}
	
	public String getUserID() {
		return id;
	}
	
	public void setUserID(String id) {
		this.id = id;
	}
	
	public List<AccountEntity> getUserAccounts() {
		return accounts;
	}
	
	public void setUserAccounts(List<AccountEntity> accounts) {
		System.out.println("before: " + this.accounts.size());
		this.accounts = accounts;
		System.out.println("after: " + this.accounts.size());
	}
}
