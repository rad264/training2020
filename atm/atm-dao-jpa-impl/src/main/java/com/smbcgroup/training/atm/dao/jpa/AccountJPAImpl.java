package com.smbcgroup.training.atm.dao.jpa;

import java.math.BigDecimal;
import java.util.Random;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.User;
import com.smbcgroup.training.atm.dao.AccountDAO;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;

public class AccountJPAImpl implements AccountDAO {

	EntityManagerFactory emf;


	@Override
	public String[] getUserAccounts(String userId) {
		EntityManager em = emf.createEntityManager();
		String[] accounts =  em.find(UserEntity.class, userId).convertToUser().getAccounts();
		em.close();
		return accounts;
	}
	
	@Override
	public BigDecimal getAccountBalance(String accountNumber) {
		EntityManager em = emf.createEntityManager();
		return em.find(AccountEntity.class, accountNumber).getBalance();
	}

	@Override
	public void updateAccountBalance(String accountNumber, BigDecimal balance) {
		EntityManager em = emf.createEntityManager();

		AccountEntity account = em.find(AccountEntity.class, accountNumber);
		account.setBalance(balance);
		
		
		em.getTransaction().begin();
		
		em.merge(account);
		
		em.getTransaction().commit();
		em.close();
		
	}

	@Override
	public String createAccount(String userId) {
		EntityManager em = emf.createEntityManager();

		UserEntity user = em.find(UserEntity.class,userId);
		
		Integer random = (new Random().nextInt(900000) + 100000);
		String accountNumber = random.toString();
		
		AccountEntity newAccount = new AccountEntity();
	
		newAccount.getAccountNumber();

		em.getTransaction().begin();
		
		em.merge(new AccountEntity(accountNumber,new BigDecimal("0.00"), user));
		
		em.flush();
		em.getTransaction().commit();
		em.close();
		
		return accountNumber;
	}

	@Override
	public String getAccountHistory(String accountNumber) {
		EntityManager em = emf.createEntityManager();
		AccountEntity account = em.find(AccountEntity.class, accountNumber);
		String accountHistory = "";
		for(HistoryEntity history: account.getHistory()) {
			accountHistory += history.getMessage();
		}
		return accountHistory;
	}

	@Override
	public void appendAudit(String accountNumber, String action) {
		EntityManager em = emf.createEntityManager();
		AccountEntity account = em.find(AccountEntity.class,accountNumber);
		em.getTransaction().begin();

		em.merge(new HistoryEntity(action, account));
		
		em.getTransaction().commit();
		em.close();
	}
	
	
	public AccountJPAImpl() {
		try {
			Class.forName("org.apache.derby.jdbc.EmbeddedDriver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		emf = Persistence.createEntityManagerFactory("derby-entities");
	}

	@Override
	public User getUser(String userId) throws UserNotFoundException {
		EntityManager em = emf.createEntityManager();
		try {
			UserEntity entity = em.find(UserEntity.class, userId);
			if (entity == null)
				throw new UserNotFoundException();
			return entity.convertToUser();
		} finally {
			em.close();
		}
	}

	@Override
	public Account getAccount(String accountNumber) throws AccountNotFoundException {
		EntityManager em = emf.createEntityManager();
		try {
			AccountEntity entity = em.find(AccountEntity.class, accountNumber);
			if (entity == null)
				throw new AccountNotFoundException();
			return entity.convertToAccount();
		} finally {
			em.close();
		}
	}

	@Override
	public void updateAccount(Account account) {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		try {
			AccountEntity entity = new AccountEntity();
			entity.setAccountNumber(account.getAccountNumber());
			entity.setBalance(account.getBalance());
			em.merge(entity);
			em.getTransaction().commit();
		} finally {
			em.close();
		}
	}

	

}
