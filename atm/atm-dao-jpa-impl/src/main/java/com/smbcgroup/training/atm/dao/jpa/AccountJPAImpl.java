// why do we persist before commit
//

package com.smbcgroup.training.atm.dao.jpa;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import com.smbcgroup.training.atm.Account;
import com.smbcgroup.training.atm.TransactionType;
import com.smbcgroup.training.atm.User;
import com.smbcgroup.training.atm.dao.AccountDAO;
import com.smbcgroup.training.atm.dao.AccountNotFoundException;
import com.smbcgroup.training.atm.dao.UserNotFoundException;

public class AccountJPAImpl implements AccountDAO {

	EntityManagerFactory emf = Persistence.createEntityManagerFactory("derby-entities");
	
	@Override
	public User getUser(String userId) throws UserNotFoundException {
		EntityManager em = emf.createEntityManager();
		
		try {
			UserEntity entity = em.find(UserEntity.class, userId);
			if (entity == null) throw new UserNotFoundException();
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
			if (entity == null) throw new AccountNotFoundException();
			return entity.convertToAccount();
		} finally {
			em.close();
		}
	}
	
	@Override
	public List<String> getUserAccounts(String userId) throws UserNotFoundException {
		EntityManager em = emf.createEntityManager();
		List<String> accounts = new ArrayList<String>();
		try {
			UserEntity entity = em.find(UserEntity.class, userId);
			if (entity == null) throw new UserNotFoundException();
			List<AccountEntity> accEntities = entity.getUserAccounts();
			for (AccountEntity accEntity : accEntities) {
				accounts.add(accEntity.convertToAccount().toString());
			}
			
			return accounts;
		} finally {
			em.close();
		}
	}

	@Override
	public BigDecimal getAccountBalance(String accountNumber) throws AccountNotFoundException {
		EntityManager em = emf.createEntityManager();
		
		try {
			AccountEntity entity = em.find(AccountEntity.class, accountNumber);
			if (entity == null) throw new AccountNotFoundException();
			return entity.getBalance();
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

	@Override
	public String addNewAccount(String userId) throws UserNotFoundException {
		Random rnd = new Random();
		String newAccountNumber = "";
		boolean accNumberAlreadyExists = true;
		
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		
		while (accNumberAlreadyExists) {
			Integer randomInteger = rnd.nextInt(999999);
			newAccountNumber = String.format("%06d", randomInteger);
			AccountEntity entity = em.find(AccountEntity.class, newAccountNumber);
			if (entity == null) accNumberAlreadyExists = false;			
		}
		
		try {
			UserEntity user = em.find(UserEntity.class, userId);
			if (user == null) throw new UserNotFoundException();
			
			AccountEntity account = new AccountEntity();
			account.setAccountNumber(newAccountNumber);
			account.setUser(user);
			account.setBalance(BigDecimal.ZERO);
			
			em.persist(account);
			em.getTransaction().commit();
			return newAccountNumber;
		} finally {
			em.close();
		}
	}

	@Override
	public void updateLogs(String accountNumber, BigDecimal amount, String transactionType) throws AccountNotFoundException {
		EntityManager em = emf.createEntityManager();
		em.getTransaction().begin();
		
		try {
			AccountEntity account = em.find(AccountEntity.class, accountNumber);
			if (account == null) throw new AccountNotFoundException();
			
			TransactionEntity transaction = new TransactionEntity();
			transaction.setAccount(account);
			transaction.setAmount(amount);
			transaction.setTransactionType(TransactionType.valueOf(transactionType.toUpperCase()));

			em.persist(transaction);
			em.getTransaction().commit();
		} finally {
			em.close();
		}
	}



	
}
