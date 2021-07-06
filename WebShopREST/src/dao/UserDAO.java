package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Administrator;
import beans.Buyer;
import beans.Credentials;
import beans.Deliverer;
import beans.Manager;
import beans.Role;
import beans.User;

public class UserDAO {
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	public Collection<User> getAll() {
		ArrayList<User> users = new ArrayList<User>();
		
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

	public Manager addNewManager(Manager manager) {
		manager.setRestaurantID("");
		manager.setRole(Role.MANAGER);
		
		saveManager(manager);
		Credentials credentials = new Credentials(manager.getUsername(), manager.getPassword(), Role.MANAGER, false);
		new LoginDAO().saveCredentials(credentials);
		
		return manager;
	}
	
	private ArrayList<Manager> getAllManagers() {
		ArrayList<Manager> managers = new ArrayList<Manager>();
		try {
			managers = new ArrayList<Manager>(Arrays.asList(objectMapper.readValue(new File("resources/managers.json"), Manager[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return managers;
	}
	
	private void saveManager(Manager manager) {
		ArrayList<Manager> managers = getAllManagers();
		managers.add(manager);
		
		try {
			objectMapper.writeValue(new File("resources/managers.json"), managers);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}

	public Deliverer addNewDeliverer(Deliverer deliverer) {
		deliverer.setRole(Role.DELIVERER);
		
		saveDeliverer(deliverer);
		Credentials credentials = new Credentials(deliverer.getUsername(), deliverer.getPassword(), Role.DELIVERER, false);
		new LoginDAO().saveCredentials(credentials);
		
		return deliverer;
	}
	
	private ArrayList<Deliverer> getAllDeliverers() {
		ArrayList<Deliverer> deliverers = new ArrayList<Deliverer>();
		try {
			deliverers = new ArrayList<Deliverer>(Arrays.asList(objectMapper.readValue(new File("resources/deliverers.json"), Deliverer[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return deliverers;
	}
	
	private void saveDeliverer(Deliverer deliverer) {
		ArrayList<Deliverer> deliverers = getAllDeliverers();
		deliverers.add(deliverer);
		
		try {
			objectMapper.writeValue(new File("resources/deliverers.json"), deliverers);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
}
