package dao;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Address;
import beans.Administrator;
import beans.Buyer;
import beans.BuyerType;
import beans.BuyerTypeName;
import beans.Credentials;
import beans.Deliverer;
import beans.Location;
import beans.Manager;
import beans.Restaurant;
import beans.Role;
import beans.ShoppingCart;
import beans.User;
import beans.WorkTime;
import dto.CredentialsDTO;

public class LoginDAO {
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	public LoginDAO() {}


	public User getUser(CredentialsDTO dto){
		ArrayList<Credentials> credentials = new ArrayList<Credentials>();
		try {
			credentials = objectMapper.readValue(new File("resources/credentials.json"), new TypeReference<List<Credentials>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
		for(Credentials c : credentials) {
			if(c.getUsername().equals(dto.getUsername())) {
				if(c.getPassword().equals(dto.getPassword())) {
					User user = findUserByUsername(c);
					Role role = c.getRole();
					switch(role) {
					case MANAGER:
						Manager manager = (Manager)user;
						if(manager.getIsBlocked() || manager.getIsDeleted())
							return null;
						break;
					case DELIVERER:
						Deliverer deliverer = (Deliverer)user;
						if(deliverer.getIsBlocked() || deliverer.getIsDeleted())
							return null;
						break;
					case BUYER:
						Buyer buyer = (Buyer)user;
						if(buyer.getIsBlocked() || buyer.getIsDeleted())
							return null;
						break;
					}
					return user;
				}
			}
		}
		return null;
	}
	
	public User findUserByUsername(Credentials credentials) {
		Role role = credentials.getRole();
		List<User> users = new ArrayList<User>();
		
		switch(role) {
			case ADMINISTRATOR:
				try {
					users = Arrays.asList(objectMapper.readValue(new File("resources/administrators.json"), Administrator[].class));
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
			case MANAGER:
				try {
					users = Arrays.asList(objectMapper.readValue(new File("resources/managers.json"), Manager[].class));
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
			case DELIVERER:
				try {
					users = Arrays.asList(objectMapper.readValue(new File("resources/deliverers.json"), Deliverer[].class));
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
			case BUYER:
				try {
					users = Arrays.asList(objectMapper.readValue(new File("resources/buyers.json"), Buyer[].class));
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
		}
		
		for(User u : users) {
			if(u.getUsername().equals(credentials.getUsername()))
				return u;
		}
		
		return null;
	}

	public Buyer registerBuyer(Buyer buyer) {
		buyer.setRole(Role.BUYER);
		buyer.setCollectedPoints(0);
		buyer.setShoppingCart(new ShoppingCart());
		buyer.setBuyerType(new BuyerType(BuyerTypeName.REGULAR, 0, 2000));
		
		saveBuyer(buyer);		
		Credentials credentials = new Credentials(buyer.getUsername(), buyer.getPassword(), Role.BUYER, false);
		saveCredentials(credentials);
		
		return buyer;
	}
	
	private ArrayList<Buyer> getAllBuyers() {
		ArrayList<Buyer> buyers = new ArrayList<Buyer>();
		try {
			buyers = new ArrayList<Buyer>(Arrays.asList(objectMapper.readValue(new File("resources/buyers.json"), Buyer[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return buyers;
	}

	private void saveBuyer(Buyer buyer) {
		ArrayList<Buyer> buyers = getAllBuyers();
		buyers.add(buyer);
		
		try {
			objectMapper.writeValue(new File("resources/buyers.json"), buyers);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}

	public Boolean usernameExists(String username) {
		ArrayList<Credentials> credentials = getAllCredentials();
		for(Credentials credential : credentials) {
			if(credential.getUsername().equals(username))
				return true;
		}
		return false;
	}


	private ArrayList<Credentials> getAllCredentials() {
		ArrayList<Credentials> credentials = new ArrayList<Credentials>();
		try {
			credentials = new ArrayList<Credentials>(Arrays.asList(objectMapper.readValue(new File("resources/credentials.json"), Credentials[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return credentials;
	}
	
	public void saveCredentials(Credentials credentials) {
		ArrayList<Credentials> allCredentials = getAllCredentials();
		allCredentials.add(credentials);
		
		try {
			objectMapper.writeValue(new File("resources/credentials.json"), allCredentials);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
}
