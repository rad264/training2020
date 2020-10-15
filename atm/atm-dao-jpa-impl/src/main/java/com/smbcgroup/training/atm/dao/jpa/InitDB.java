package com.smbcgroup.training.atm.dao.jpa;

import java.math.BigDecimal;

import javax.persistence.EntityManager;

public class InitDB {

	public static void main(String[] args) {
		EntityManager em = new AccountJPAImpl().emf.createEntityManager();
		em.getTransaction().begin();

		UserEntity rdelaney = new UserEntity("rdelaney");
		em.persist(rdelaney);
		AccountEntity account = new AccountEntity("123456", new BigDecimal("100"), rdelaney);
		em.persist(account);
		em.merge(new LoggerEntity("creation", new BigDecimal("100"), account));

		em.getTransaction().commit();
		em.close();
		
		/* em.getTransaction().begin();
		UserEntity rdelaney = em.find(UserEntity.class, "rdelaney");
		AccountEntity account2 = new AccountEntity("222222", new BigDecimal("100"), rdelaney);
		em.persist(account2);
		em.merge(new LoggerEntity("creation", new BigDecimal("100"), account2));
		em.getTransaction().commit();
		em.close(); */
	}

}
