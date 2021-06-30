package dao;

import java.util.ArrayList;
import java.util.Collection;

import beans.Administrator;
import beans.Buyer;
import beans.Manager;
import beans.User;

public class UserDAO {
	private ArrayList<User> users = new ArrayList<User>();
	
	public Collection<User> getAll() {
		User u1 = new Administrator();
		u1.setFirstName("Rule");
		u1.setLastName("Rulin");
		
		User u2 = new Manager();
		u2.setFirstName("Gamzo");
		u2.setLastName("Gamzigrad");
		
		User u3 = new Buyer();
		u3.setFirstName("Kupko");
		u3.setLastName("Kupina");
		
		User u4 = new Administrator();
		u4.setFirstName("Sima");
		u4.setLastName("Simic");
		
		users.add(u1);
		users.add(u2);
		users.add(u3);
		users.add(u4);
		
		return users;
	}
	
}
