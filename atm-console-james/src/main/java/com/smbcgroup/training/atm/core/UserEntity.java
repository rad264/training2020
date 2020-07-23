package com.smbcgroup.training.atm.core;

import java.util.List;

@Entity
@Table(name = "Users")
public class UserEntity {
	
	@Id
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "name")
	private String name;
	
	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
	private List<AccountEntity> accounts;
	
	public UserEntity() {
		
	}
	
	public UserEntity(Integer id, String name) {
		this.id = id;
		this.name = name;
	}
	
	public Integer getId() {
		return id;
	}
	
	public void setId(Integer id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
}
