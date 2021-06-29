package beans;

import java.util.*;

public class OrderItem {

   private String orderID;
   private String itemID;
   
   public OrderItem() {}
   
	public OrderItem(String orderID, String itemID) {
		super();
		this.orderID = orderID;
		this.itemID = itemID;
	}

	public String getOrderID() {
		return orderID;
	}
	
	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}
	
	public String getItemID() {
		return itemID;
	}
	
	public void setItemID(String itemID) {
		this.itemID = itemID;
	}
}