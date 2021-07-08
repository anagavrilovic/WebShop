package beans;

import java.util.*;

public class Order {

   private String id;
   private Date time;
   private double price;
   private OrderStatus status;
   private String restaurantID;
   
   
   public Order() {}
   
	public Order(Date time, double price, OrderStatus status, String restaurantID) {
		super();
		this.id = UUID.randomUUID().toString();
		this.time = time;
		this.price = price;
		this.status = status;
		this.restaurantID = restaurantID;
	}

	public String getId() {
		return id;
	}
	
	public void setId(String id) {
		this.id = id;
	}
	
	public Date getTime() {
		return time;
	}
	
	public void setTime(Date time) {
		this.time = time;
	}
	
	public double getPrice() {
		return price;
	}
	
	public void setPrice(double price) {
		this.price = price;
	}
	
	public OrderStatus getStatus() {
		return status;
	}
	
	public void setStatus(OrderStatus status) {
		this.status = status;
	}
	
	public String getRestaurantID() {
		return restaurantID;
	}
	
	public void setRestaurantID(String restaurantID) {
		this.restaurantID = restaurantID;
	}
	
}