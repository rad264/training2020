package atm.smbcgroup.training.atm;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.BeforeClass;
import org.junit.jupiter.api.Test;

import com.smbcgroup.training.atm.ATMServicer;
import com.smbcgroup.training.atm.ATMServicer.ATMException;
import com.smbcgroup.training.atm.AccountAccessor;

class ATMServicerTest {
	
	ATMServicer atmService = new ATMServicer(new AccountAccessor());
	
	@BeforeClass
	public void changeDataLocation() {
		atmService.changeDataLocation("data-test");
	}
	
	
	@Test
	void testLogin_FakeAccount() {
		try {
			atmService.login("grandpa");
			fail();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			assertEquals("Invalid user ID.",e.getMessage());
		}
	}
	
	@Test
	void testLogin_RealAccount() {
		try {
			atmService.login("michael");
		} catch (ATMException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
