package beans;

import java.util.*;

public class Manager extends User {

   private String restaurantID;
   private Boolean isDeleted = false;
   private Boolean isBlocked = false;

	public Manager() {
		super();
	}
	
	public Manager(String restaurantID, Boolean isDeleted, Boolean isBlocked) {
		super();
		this.restaurantID = restaurantID;
		this.isDeleted = isDeleted;
		this.isBlocked = isBlocked;
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

}