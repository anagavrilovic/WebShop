package dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;

import beans.Restaurant;

public class RestaurantDAO {
	private ArrayList<Restaurant> restaurants;
	
	public RestaurantDAO() {
		restaurants = new ArrayList<Restaurant>();
		Restaurant r1 = new Restaurant("images/tomato.png", "Tomato Restaurant", true, "Romanian", 5);
		Restaurant r2 = new Restaurant("images/chilli.png", "Chilli Restaurant", true, "Barbeque", 4);
		Restaurant r3 = new Restaurant("images/tomato.png", "Ketchup Restaurant", false, "Italian", 3);
		
		restaurants.add(r1);
		restaurants.add(r2);
		restaurants.add(r3);
	}
	
	public Collection<Restaurant> getAll() {
		return restaurants;
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