package beans;

import java.util.*;

public class BuyersOrder {
   
   private String buyerUsername;
   private String orderID;
   
   public BuyersOrder() {}
   
	public BuyersOrder(String buyerUsername, String orderID) {
		super();
		this.buyerUsername = buyerUsername;
		this.orderID = orderID;
	}

	public String getBuyerUsername() {
		return buyerUsername;
	}
	
	public void setBuyerUsername(String buyerUsername) {
		this.buyerUsername = buyerUsername;
	}
	
	public String getOrderID() {
		return orderID;
	}
	
	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}
}