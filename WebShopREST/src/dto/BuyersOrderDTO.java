package dto;

import java.util.Date;

import beans.Order;
import beans.OrderStatus;

public class BuyersOrderDTO {
	private String id;
    private Date time;
    private double price;
    private OrderStatus status;
    private String restaurantName;
    private String restaurantID;
    private String buyersUsername;
    private String restaurantType;
    
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
	public String getRestaurantName() {
		return restaurantName;
	}
	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}
	public String getBuyersUsername() {
		return buyersUsername;
	}
	public void setBuyersUsername(String buyersUsername) {
		this.buyersUsername = buyersUsername;
	}
	
	public String getRestaurantType() {
		return restaurantType;
	}
	
	public void setRestaurantType(String restaurantType) {
		this.restaurantType = restaurantType;
	}
	
	public String getRestaurantID() {
		return restaurantID;
	}
	
	public void setRestaurantID(String restaurantID) {
		this.restaurantID = restaurantID;
	}
	
	
	public BuyersOrderDTO() {
		
	}
	
	public BuyersOrderDTO(String id, Date time, double price, OrderStatus status, String restaurantName, String restaurantID,
			String buyersUsername) {
		super();
		this.id = id;
		this.time = time;
		this.price = price;
		this.status = status;
		this.restaurantName = restaurantName;
		this.restaurantID = restaurantID;
		this.buyersUsername = buyersUsername;
	}
	
	public BuyersOrderDTO(Order order) {
		this.id = order.getId();
		this.time = order.getTime();
		this.price = order.getPrice();
		this.status = order.getStatus();
		this.buyersUsername = order.getBuyersUsername();
		this.restaurantID = order.getRestaurantID();
	}
    
    
}
