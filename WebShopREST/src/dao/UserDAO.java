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
import dto.ManagerDTO;

public class UserDAO {
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	public Collection<User> getAll() {
		ArrayList<User> users = new ArrayList<User>();
		
		users.addAll(getAllAdministrators());
		users.addAll(getAllManagers());
		users.addAll(getAllBuyers());
		users.addAll(getAllDeliverers());
		
		return users;
	}

	public ManagerDTO addNewManager(Manager manager) {
		manager.setRestaurantID("");
		manager.setRole(Role.MANAGER);
		
		saveManager(manager);
		Credentials credentials = new Credentials(manager.getUsername(), manager.getPassword(), Role.MANAGER, false);
		new LoginDAO().saveCredentials(credentials);
		
		ManagerDTO m = new ManagerDTO(manager.getUsername(), manager.getFirstName(), manager.getLastName(),
				manager.getDateOfBirth(), manager.getRole(), "", manager.getIsBlocked());
		RestaurantDAO restaurantDAO = new RestaurantDAO();
		m.setRestaurantName(restaurantDAO.getRestaurantNameByID(manager.getRestaurantID()));
		
		return m;
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
	
	public Manager getManagerByUsername(String username) {
		ArrayList<Manager> managers = getAllManagers();
		for(Manager m : managers) {
			if(m.getUsername().equals(username))
				return m;
		}
		return null;
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
	
	public ArrayList<Deliverer> getAllDeliverers() {
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
	
	public ArrayList<Buyer> getAllBuyers() {
		ArrayList<Buyer> buyers = new ArrayList<Buyer>();
		try {
			buyers = new ArrayList<Buyer>(Arrays.asList(objectMapper.readValue(new File("resources/buyers.json"), Buyer[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return buyers;
	}
	
	public ArrayList<Administrator> getAllAdministrators() {
		ArrayList<Administrator> administrators = new ArrayList<Administrator>();
		try {
			administrators = new ArrayList<Administrator>(Arrays.asList(objectMapper.readValue(new File("resources/administrators.json"), Administrator[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return administrators;
	}

	public Collection<ManagerDTO> getAllManagersWithRestaurants() {
		ArrayList<Manager> managers = getAllManagers();
		ArrayList<ManagerDTO> managersWithRestaurants = new ArrayList<ManagerDTO>();
		
		for(Manager m : managers) {
			ManagerDTO manager = new ManagerDTO(m.getUsername(), m.getFirstName(), m.getLastName(), m.getDateOfBirth(), m.getRole(), "", m.getIsBlocked());
			RestaurantDAO restaurantDAO = new RestaurantDAO();
			manager.setRestaurantName(restaurantDAO.getRestaurantNameByID(m.getRestaurantID()));
			managersWithRestaurants.add(manager);
		}
		
		return managersWithRestaurants;
	}

}
