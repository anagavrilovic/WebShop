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
	private ArrayList<Restaurant> restaurants;
	
	public RestaurantDAO() {

	}
	
	public Collection<Restaurant> getAll() {
		ObjectMapper objectMapper = new ObjectMapper();
		List<Restaurant> allRestaurants = new ArrayList<Restaurant>();
		try {
			allRestaurants = Arrays.asList(objectMapper.readValue(new File("resources/restaurants.json"), Restaurant[].class));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return allRestaurants;
	}

	public Collection<Restaurant> getSortedAtoZ() {
		Collections.sort(restaurants, new Comparator<Restaurant>() {
		      @Override
		      public int compare(final Restaurant object1, final Restaurant object2) {
		          return object1.getName().compareTo(object2.getName());
		      }
		  });
		return restaurants;
	}

	public Collection<Restaurant> getFilteredByType(ArrayList<String> types) {
		if(types.size() == 0) {
			return restaurants;
		}
		ArrayList<Restaurant> filtered = new ArrayList<Restaurant>();
		for(Restaurant r : restaurants) {
			if(types.contains(r.getType())) {
				filtered.add(r);
			}
		}
		return filtered;
	}

}
