package beans;

import java.util.*;

public class Manager extends User {

   private String restaurantID;
   private Boolean isDeleted = false;
   private Boolean isBlocked = false;
   
   private Restaurant restaurant;

	public Manager() {
		super();
	}
	
	public Manager(String restaurantID, Boolean isDeleted, Boolean isBlocked, Restaurant restaurant) {
		super();
		this.restaurantID = restaurantID;
		this.isDeleted = isDeleted;
		this.isBlocked = isBlocked;
		this.restaurant = restaurant;
	}

	public String getRestaurantID() {
		return restaurantID;
	}

	public void setRestaurantID(String restaurantID) {
		this.restaurantID = restaurantID;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Boolean getIsBlocked() {
		return isBlocked;
	}

	public void setIsBlocked(Boolean isBlocked) {
		this.isBlocked = isBlocked;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}
}