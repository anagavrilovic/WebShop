package dao;

import java.util.ArrayList;

import beans.Administrator;
import beans.Buyer;
import beans.Deliverer;
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
		u2.setFirstName("Mamzo");
		u2.setLastName("Mamzigrad");
		u2.setUsername("maca");
		u2.setPassword("maca");
		u2.setRole(Role.MANAGER);
		
		User u3 = new Buyer();
		u3.setFirstName("Bamzo");
		u3.setLastName("Bamzigrad");
		u3.setUsername("baca");
		u3.setPassword("baca");
		u3.setRole(Role.BUYER);
		
		User u4 = new Deliverer();
		u4.setFirstName("Damzo");
		u4.setLastName("Damzigrad");
		u4.setUsername("daca");
		u4.setPassword("daca");
		u4.setRole(Role.DELIVERER);
		
		users.add(u1);
		users.add(u2);
		users.add(u3);
		users.add(u4);
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
