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
import beans.Credentials;
import beans.Deliverer;
import beans.Location;
import beans.Manager;
import beans.Restaurant;
import beans.Role;
import beans.User;
import beans.WorkTime;
import dto.CredentialsDTO;

public class LoginDAO {
	
	public LoginDAO() {
		
		// DUMMY DATA
		Address a1 = new Address("Dimitrija Tucovića", "3", "Novi Sad", "21000");
		Address a2 = new Address("Stražilovska", "8", "Novi Sad", "21000");
		Address a3 = new Address("Bulevar Oslobođenja", "119", "Novi Sad", "21000");
		
		Location l1 = new Location(45.248001756873414, 19.842227869107603, a1);
		Location l2 = new Location(45.24886155275487, 19.848704417764406, a2);
		Location l3 = new Location(45.244807720188916, 19.841773984451038, a3);
		
		WorkTime wt = new WorkTime("08:00", "22:00");
		
		Restaurant r1 = new Restaurant("Gyros Master", "Brza hrana", "../images/girosMasterLogo.png", "../images/girosMasterCover.jpg", l1, wt);
		Restaurant r2 = new Restaurant("Kuća Kobasice", "Brza hrana", "../images/kucaKobasiceLogo.png", "../images/cover.jpg", l2, wt);
		Restaurant r3 = new Restaurant("Walter", "Roštilj", "../images/walterLogo.png", "../images/cover.jpg", l3, wt);
		
		ArrayList<Restaurant> restaurants = new ArrayList<Restaurant>();
		restaurants.add(r1);
		restaurants.add(r2);
		restaurants.add(r3);
		
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			objectMapper.writeValue(new File("resources/restaurants.json"), restaurants);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}

	public User getUser(CredentialsDTO dto){
		ObjectMapper objectMapper = new ObjectMapper();
		ArrayList<Credentials> credentials = new ArrayList<Credentials>();
		try {
			credentials = objectMapper.readValue(new File("resources/credentials.json"), new TypeReference<List<Credentials>>(){});
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
		for(Credentials c : credentials) {
			if(c.getUsername().equals(dto.getUsername())) {
				if(c.getPassword().equals(dto.getPassword())) {
					return findUserByUsername(c);
				}
			}
		}
		return null;
	}
	
	public User findUserByUsername(Credentials credentials) {
		Role role = credentials.getRole();
		ObjectMapper objectMapper = new ObjectMapper();
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
}
