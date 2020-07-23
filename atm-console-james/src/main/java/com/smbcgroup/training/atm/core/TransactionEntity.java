package com.smbcgroup.training.atm.core;

import java.math.BigDecimal;

@Entity
@Table(name = "Transactions")
public class TransactionEntity {

	@Id
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "account_id")
	private Integer account_id;
	
	@Column(name = "type")
	private String type;
	
	@Column(name = "sign")
	private Boolean sign;
	
	@Column(name = "amount")
	private BigDecimal amount;
	
	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private UserEntity user;
	
	public Account() {
		
	}
	
	public Account(Integer id, BigDecimal amount, UserEntity user) {
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
	
}
