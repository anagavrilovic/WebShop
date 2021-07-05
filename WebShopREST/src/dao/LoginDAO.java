package dao;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Administrator;
import beans.Buyer;
import beans.Credentials;
import beans.Deliverer;
import beans.Manager;
import beans.Role;
import beans.User;
import dto.CredentialsDTO;

public class LoginDAO {
	
	public LoginDAO() {

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
		ArrayList<User> users = new ArrayList<User>();
		
		switch(role) {
			case ADMINISTRATOR:
				try {
					users = objectMapper.readValue(new File("resources/administrators.json"), new TypeReference<List<Administrator>>(){});
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
			case MANAGER:
				try {
					users = objectMapper.readValue(new File("resources/managers.json"), new TypeReference<List<Manager>>(){});
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
			case DELIVERER:
				try {
					users = objectMapper.readValue(new File("resources/deliverers.json"), new TypeReference<List<Deliverer>>(){});
				} catch (Exception e) {
					e.printStackTrace();
				} 
				break;
			case BUYER:
				try {
					System.out.println("Nesto bezvezno.");
					users = objectMapper.readValue(new File("resources/buyers.json"), new TypeReference<List<Buyer>>(){});
					//System.out.println(users.size());
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
