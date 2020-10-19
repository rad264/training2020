package com.smbcgroup.training.atm.dao.jpa;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.Logger;
import com.smbcgroup.training.atm.User;
import com.smbcgroup.training.atm.dao.AccountDAO;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.InsufficientBalanceException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;

public class AccountJPAImpl implements AccountDAO {

	EntityManagerFactory emf = Persistence.createEntityManagerFactory("derby-entities");

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
	public void createAccount(String userId, Account account) throws UserNotFoundException {
		updateAccount(account);
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		UserEntity userEnt = em.find(UserEntity.class, userId);
		AccountEntity accountEnt = new AccountEntity(account.getAccountNumber(), account.getBalance(), userEnt);
		em.merge(accountEnt);
		em.getTransaction().commit();
		em.close();
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

	@Override
	public void writeAccountLog(String accountNumber, String transaction, BigDecimal amount)
			throws AccountNotFoundException {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		LoggerEntity newLog = new LoggerEntity();
		newLog.setAmount(amount);
		newLog.setTransaction(transaction);
		newLog.setTime(new Timestamp(System.currentTimeMillis()));
		AccountEntity account = em.find(AccountEntity.class, accountNumber);
		if (account == null) throw new AccountNotFoundException();
		newLog.setAccount(account);
		em.merge(newLog);
		em.getTransaction().commit();
		em.close();
		
	}

	@Override
	public void deposit(String accountNumber, BigDecimal amount) throws AccountNotFoundException {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		AccountEntity account= em.find(AccountEntity.class, accountNumber);
		if (account == null) throw new AccountNotFoundException();
		account.setBalance(account.getBalance().add(amount));
		em.merge(account);
		em.getTransaction().commit();
		em.close();
	}

	@Override
	public void withdraw(String accountNumber, BigDecimal amount) throws AccountNotFoundException, InsufficientBalanceException {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		AccountEntity account= em.find(AccountEntity.class, accountNumber);
		if (account == null) throw new AccountNotFoundException();
		BigDecimal newBalance = account.getBalance().subtract(amount);
		if (newBalance.compareTo(BigDecimal.ZERO) < 0) throw new InsufficientBalanceException();
		account.setBalance(account.getBalance().subtract(amount));
		em.merge(account);
		em.getTransaction().commit();
		em.close();
		
	}

	@Override
	public List<Logger> getAccountLogs(String accountNumber) throws AccountNotFoundException {
		EntityManager em = emf.createEntityManager();
		AccountEntity account= em.find(AccountEntity.class, accountNumber);
			if (account == null) throw new AccountNotFoundException();
			List<Logger> logs = new ArrayList<Logger>();
			for(LoggerEntity log : account.getLogs()) {
				logs.add(log.convertToLogger());
			}
			em.close();
			return logs;
	}
	
	





}