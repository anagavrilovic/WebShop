package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Administrator;
import beans.Buyer;
import beans.Credentials;
import beans.Deliverer;
import beans.Manager;
import beans.Role;
import beans.User;
import dto.BuyerCancellationTimeDTO;
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
	
	public ArrayList<Manager> getAllManagers() {
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
	
	public Deliverer getDelivererByUsername(String username) {
		ArrayList<Deliverer> deliverers = getAllDeliverers();
		for(Deliverer d : deliverers) {
			if(d.getUsername().equals(username))
				return d;
		}
		return null;
	}
	
	
	public Buyer getBuyerByUsername(String username) {
		ArrayList<Buyer> buyers = getAllBuyers();
		for(Buyer b : buyers) {
			if(b.getUsername().equals(username))
				return b;
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
		
		setSuspiciousBuyers(buyers);
		
		return buyers;
	}
	
	private void setSuspiciousBuyers(ArrayList<Buyer> buyers) {
		ArrayList<BuyerCancellationTimeDTO> cancellations = new ArrayList<BuyerCancellationTimeDTO>();
		try {
			cancellations = new ArrayList<BuyerCancellationTimeDTO>(Arrays.asList
					(objectMapper.readValue(new File("resources/buyerCancellationTime.json"), BuyerCancellationTimeDTO[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -1);
		Date oneMonthAgo = calendar.getTime();
		
		for(Buyer b : buyers) {
			int numberOfCanellations = 0;
			
			for(BuyerCancellationTimeDTO bct : cancellations) {
				if(bct.getUsername().equals(b.getUsername()) && bct.getCancellationTime().after(oneMonthAgo)) {
					numberOfCanellations++;
				}
			}
			
			if(numberOfCanellations > 5) {
				b.setIsSuspicious(true);
			}
		}
		
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

	public void updateDeliverer(Deliverer user) {
		ArrayList<Deliverer> deliverers = getAllDeliverers();
		for(Deliverer u : deliverers) {
			if(u.getUsername().equals(user.getUsername())) {
				u.setFirstName(user.getFirstName());
				u.setLastName(user.getLastName());
				u.setDateOfBirth(user.getDateOfBirth());
				u.setGender(user.getGender());
				u.setPassword(user.getPassword());
				break;
			}
		}
		
		try {
			objectMapper.writeValue(new File("resources/deliverers.json"), deliverers);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}

	public void updateBuyer(Buyer user) {
		ArrayList<Buyer> buyers = getAllBuyers();
		for(Buyer u : buyers) {
			if(u.getUsername().equals(user.getUsername())) {
				u.setFirstName(user.getFirstName());
				u.setLastName(user.getLastName());
				u.setDateOfBirth(user.getDateOfBirth());
				u.setGender(user.getGender());
				u.setPassword(user.getPassword());
				break;
			}
		}
		
		try {
			objectMapper.writeValue(new File("resources/buyers.json"), buyers);
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
	}

	public void updateManager(Manager user) {
		ArrayList<Manager> managers = getAllManagers();
		for(Manager u : managers) {
			if(u.getUsername().equals(user.getUsername())) {
				u.setFirstName(user.getFirstName());
				u.setLastName(user.getLastName());
				u.setDateOfBirth(user.getDateOfBirth());
				u.setGender(user.getGender());
				u.setPassword(user.getPassword());
				break;
			}
		}
		
		try {
			objectMapper.writeValue(new File("resources/managers.json"), managers);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}

	public void updateAdministrator(Administrator user) {
		ArrayList<Administrator> administrators = getAllAdministrators();
		for(Administrator u : administrators) {
			if(u.getUsername().equals(user.getUsername())) {
				u.setFirstName(user.getFirstName());
				u.setLastName(user.getLastName());
				u.setDateOfBirth(user.getDateOfBirth());
				u.setGender(user.getGender());
				u.setPassword(user.getPassword());
				break;
			}
		}
		
		try {
			objectMapper.writeValue(new File("resources/administrators.json"), administrators);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}

	public User blockUser(User user) {
		Role role = user.getRole();
		
		//List<User> users = new ArrayList<User>();
		
		switch(role) {
			case MANAGER:
				try {
					ArrayList<Manager> users = new ArrayList<Manager>(Arrays.asList(objectMapper.readValue(new File("resources/managers.json"), Manager[].class)));
					for(Manager u : users) {
						if(u.getUsername().equals(user.getUsername())) {
							u.setIsBlocked(true);
						}
					}
					saveManagers(users);
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
			case DELIVERER:
				try {
					ArrayList<Deliverer> users = new ArrayList<Deliverer>(Arrays.asList(objectMapper.readValue(new File("resources/deliverers.json"), Deliverer[].class)));
					for(Deliverer u : users) {
						if(u.getUsername().equals(user.getUsername())) {
							u.setIsBlocked(true);
						}
					}
					saveDeliverers(users);
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
			case BUYER:
				try {
					ArrayList<Buyer> users = new ArrayList<Buyer>(Arrays.asList(objectMapper.readValue(new File("resources/buyers.json"), Buyer[].class)));
					for(Buyer u : users) {
						if(u.getUsername().equals(user.getUsername())) {
							u.setIsBlocked(true);
						}
					}
					saveBuyers(users);
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
		}
		return user;
	}
	
	public void saveManagers(ArrayList<Manager> managers) {
		try {
			objectMapper.writeValue(new File("resources/managers.json"), managers);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
	
	public void saveBuyers(ArrayList<Buyer> buyers) {
		try {
			objectMapper.writeValue(new File("resources/buyers.json"), buyers);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
	
	public void saveDeliverers(ArrayList<Deliverer> deliverers) {
		try {
			objectMapper.writeValue(new File("resources/deliverers.json"), deliverers);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}

	public User unblockUser(User user) {
		Role role = user.getRole();
		
		//List<User> users = new ArrayList<User>();
		
		switch(role) {
			case MANAGER:
				try {
					ArrayList<Manager> users = new ArrayList<Manager>(Arrays.asList(objectMapper.readValue(new File("resources/managers.json"), Manager[].class)));
					for(Manager u : users) {
						if(u.getUsername().equals(user.getUsername())) {
							u.setIsBlocked(false);
						}
					}
					saveManagers(users);
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
			case DELIVERER:
				try {
					ArrayList<Deliverer> users = new ArrayList<Deliverer>(Arrays.asList(objectMapper.readValue(new File("resources/deliverers.json"), Deliverer[].class)));
					for(Deliverer u : users) {
						if(u.getUsername().equals(user.getUsername())) {
							u.setIsBlocked(false);
						}
					}
					saveDeliverers(users);
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
			case BUYER:
				try {
					ArrayList<Buyer> users = new ArrayList<Buyer>(Arrays.asList(objectMapper.readValue(new File("resources/buyers.json"), Buyer[].class)));
					for(Buyer u : users) {
						if(u.getUsername().equals(user.getUsername())) {
							u.setIsBlocked(false);
						}
					}
					saveBuyers(users);
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
		}
		return user;
	}
	
	public Collection<Manager> getFreeManagers() {
		ArrayList<Manager> managers = getAllManagers();
		ArrayList<Manager> freeManagers = new ArrayList<Manager>();
		
		for(Manager m : managers) {
			if(m.getRestaurantID().equals("")) {
				freeManagers.add(m);
			}
		}
		
		return freeManagers;
	}
	


}
