package com.smbcgroup.training.atm.dao.jpa;

import java.math.BigDecimal;

import javax.persistence.EntityManager;

public class InitDB {

	public static void main(String[] args) {
		EntityManager em = new AccountJPAImpl().emf.createEntityManager();
		em.getTransaction().begin();

		em.persist(new AccountEntity("123456", new BigDecimal("100")));

		em.getTransaction().commit();
		em.close();
	}

}
