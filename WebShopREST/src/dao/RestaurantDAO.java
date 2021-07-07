package dao;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Administrator;
import beans.Restaurant;

public class RestaurantDAO {
	
	ObjectMapper objectMapper = new ObjectMapper();
	
	public RestaurantDAO() {

	}
	
	public ArrayList<Restaurant> getAll() {
		ArrayList<Restaurant> allRestaurants = new ArrayList<Restaurant>();
		try {
			allRestaurants = new ArrayList<Restaurant>(Arrays.asList(objectMapper.readValue(new File("resources/restaurants.json"), Restaurant[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return allRestaurants;
	}

	public String getRestaurantNameByID(String restaurantID) {
		ArrayList<Restaurant> restaurants = getAll();
		for(Restaurant r: restaurants) {
			if(r.getId().equals(restaurantID)) {
				return r.getName();
			}
		}
		return "Bez restorana";
	}

}
