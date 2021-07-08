package beans;

import java.util.*;

public class OrderItem {

   private String orderID;
   private String itemID;
   private int itemQuantity;
   
   public OrderItem() {}
   
	public OrderItem(String orderID, String itemID, int itemQuantity) {
		super();
		this.orderID = orderID;
		this.itemID = itemID;
		this.itemQuantity = itemQuantity;
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

	public int getItemQuantity() {
		return itemQuantity;
	}

	public void setItemQuantity(int itemQuantity) {
		this.itemQuantity = itemQuantity;
	}
	
	
}