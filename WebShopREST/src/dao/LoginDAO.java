package dao;

import java.util.ArrayList;

import beans.Administrator;
import beans.Buyer;
import beans.Manager;
import beans.Role;
import beans.User;
import dto.CredentialsDTO;

public class LoginDAO {
	private ArrayList<CredentialsDTO> credentials = new ArrayList<CredentialsDTO>();
	private ArrayList<User> users = new ArrayList<User>();
	
	
	public LoginDAO() {
		credentials.add(new CredentialsDTO("aca", "aca"));
		credentials.add(new CredentialsDTO("daca", "daca"));
		
		User u1 = new Administrator();
		u1.setFirstName("Rule");
		u1.setLastName("Rulin");
		u1.setUsername("aca");
		u1.setPassword("aca");
		u1.setRole(Role.ADMINISTRATOR);;
		
		User u2 = new Manager();
		u2.setFirstName("Gamzo");
		u2.setLastName("Gamzigrad");
		u2.setUsername("daca");
		u2.setPassword("daca");
		u2.setRole(Role.MANAGER);
		
		users.add(u1);
		users.add(u2);
		
	}



	public User getUser(CredentialsDTO dto) {
		for(User u : users) {
			if(u.getUsername().equals(dto.getUsername())) {
				if(u.getPassword().equals(dto.getPassword())) {
					return u;
				}
			}
		}
		return null;
	}
}
