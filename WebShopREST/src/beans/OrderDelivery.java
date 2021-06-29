package beans;

import java.util.*;

public class OrderDelivery {
   
   private String delivererUsername;
   private String orderID;
   
   public OrderDelivery() {}
   
	public OrderDelivery(String delivererUsername, String orderID) {
		super();
		this.delivererUsername = delivererUsername;
		this.orderID = orderID;
	}

	public String getDelivererUsername() {
		return delivererUsername;
	}
	
	public void setDelivererUsername(String delivererUsername) {
		this.delivererUsername = delivererUsername;
	}
	
	public String getOrderID() {
		return orderID;
	}
	
	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}
}