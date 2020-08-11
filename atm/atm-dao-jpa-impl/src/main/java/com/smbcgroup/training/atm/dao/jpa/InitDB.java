package com.smbcgroup.training.atm.dao.jpa;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.EntityManager;

public class InitDB {

	public static void main(String[] args) {
		EntityManager em = new AccountJPAImpl().emf.createEntityManager();
		em.getTransaction().begin();

		UserEntity jwong = new UserEntity("jwong");
		em.persist(jwong);
		
		AccountEntity ac1 = new AccountEntity("123456", new BigDecimal("100"), jwong);
		em.persist(ac1);
		
		AccountEntity ac2 = new AccountEntity("111222", new BigDecimal("150"), jwong);
		em.persist(ac2);
		
		em.persist(new TransactionEntity(new Date(), "Deposit", new BigDecimal("100"), ac1));
		em.persist(new TransactionEntity(new Date(), "Deposit", new BigDecimal("150"), ac2));

		em.getTransaction().commit();
		em.close();
	}

}