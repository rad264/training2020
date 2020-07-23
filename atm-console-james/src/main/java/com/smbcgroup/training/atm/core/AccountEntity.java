package com.smbcgroup.training.atm.core;

import java.math.BigDecimal;

@Entity
@Table(name = "Accounts")
public class AccountEntity {
	
	@Id
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "amount")
	private BigDecimal amount;
	
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private UserEntity user;
	
	public AccountEntity() {
		
	}
	
	public AccountEntity(Integer id, BigDecimal amount, UserEntity user) {
		this.id = id;
		this.amount = amount;
		this.user = user;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	
	public BigDecimal getAmount() {
		return amount;
	}
	
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	
	public UserEntity getUser() {
		return user;
	}
	
	public void setUser(UserEntity user) {
		this.user = user;
	}
}
