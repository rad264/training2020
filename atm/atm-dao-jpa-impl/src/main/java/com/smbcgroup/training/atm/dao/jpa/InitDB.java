package com.smbcgroup.training.atm.dao.jpa;

import java.math.BigDecimal;

import javax.persistence.EntityManager;

public class InitDB {

	public static void main(String[] args) throws ClassNotFoundException {
		EntityManager em = new AccountJPAImpl().emf.createEntityManager();
		
		em.getTransaction().begin();
	    em.createQuery("DELETE FROM HistoryEntity").executeUpdate();
	    em.createQuery("DELETE FROM AccountEntity").executeUpdate();
	    em.createQuery("DELETE FROM UserEntity").executeUpdate();
		em.getTransaction().commit();
		
		em.getTransaction().begin();

		UserEntity rdelaney = new UserEntity("rdelaney");
		em.persist(rdelaney);
		em.merge(new AccountEntity("123456", new BigDecimal("100"), rdelaney));

		UserEntity l = new UserEntity("l");
		em.persist(l);
		em.merge(new AccountEntity("654321", new BigDecimal("100"), l));
		
		em.getTransaction().commit();
		em.close();
	}

}
