package dao;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Administrator;
import beans.Buyer;
import beans.Item;
import beans.Restaurant;

public class RestaurantDAO {
	
	private ObjectMapper objectMapper = new ObjectMapper();
	
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
	
	public Item addNewItem(Item item, String restaurantId) {
		ArrayList<Item> items = new ArrayList<Item>();
		items = getItems();
		item.setId(UUID.randomUUID().toString());
		item.setRestaurantID(restaurantId);
		items.add(item);
		saveItems(items);
		return item;
	}
	
	private void saveItems(ArrayList<Item> items) {
		try {
			objectMapper.writeValue(new File("resources/restaurantItems.json"), items);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
	
	private ArrayList<Item> getItems() {
		ArrayList<Item> items = new ArrayList<Item>();
		try {
			items = new ArrayList<Item>(Arrays.asList(objectMapper.readValue(new File("resources/restaurantItems.json"), Item[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return items;
	}

	public Boolean itemExists(String name, String restaurantId) {
		ArrayList<Item> items = new ArrayList<Item>();
		items = getItems();
		for(Item i : items) {
			if(i.getName().equalsIgnoreCase(name) && i.getRestaurantID().equals(restaurantId)) {
				return true;
			}
		}
		return false;
	}

	public Collection<Item> getAllProducts(String restaurantId) {
		ArrayList<Item> allItems = new ArrayList<Item>();
		ArrayList<Item> items = new ArrayList<Item>();
		allItems = getItems();
		for(Item i : allItems) {
			if(i.getRestaurantID().equals(restaurantId)) {
				items.add(i);
			}
		}
		return items;
	}

	public Restaurant getByID(String id) {
		ArrayList<Restaurant> restaurants = getAll();
		for(Restaurant r : restaurants) {
			if(r.getId().equals(id))
				return r;
		}
		return null;
	}

	public Item updateItem(Item item) {
		ArrayList<Item> allItems = new ArrayList<Item>();
		allItems = getItems();
		int idx = -1;
		for(Item i : allItems) {
			if(i.getId().equals(item.getId())) {
				idx = allItems.indexOf(i);
			}
		}
		allItems.set(idx, item);
		saveItems(allItems);
		return item;
	}

	
}
