package beans;

import java.util.*;

public class Item {

   private String id;
   private String name;
   private double price;
   private ItemType type;
   private double quantity;
   private String description;
   private String imagePath;
   private String restaurantID;
   private Boolean isDeleted = false;

   
   public Item() {}
   
	public Item(String name, double price, ItemType type, double quantity, String description, String imagePath,
		String restaurantID, Boolean isDeleted) {
		super();
		this.id = UUID.randomUUID().toString();
		this.name = name;
		this.price = price;
		this.type = type;
		this.quantity = quantity;
		this.description = description;
		this.imagePath = imagePath;
		this.restaurantID = restaurantID;
		this.isDeleted = isDeleted;
	}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	public ItemType getType() {
		return type;
	}
	
	public void setType(ItemType type) {
		this.type = type;
	}
	
	public double getQuantity() {
		return quantity;
	}
	
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	
	public String getDescription() {
		return description;
	}
	
	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getImagePath() {
		return imagePath;
	}
	
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
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
	
}