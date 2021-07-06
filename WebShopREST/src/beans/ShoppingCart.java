package beans;

import java.util.*;

public class ShoppingCart {
   
   private Map<String, Integer> items = new HashMap<String, Integer>();
   private double totalPrice;
   
   public ShoppingCart() {}
   
	public ShoppingCart(Map<String, Integer> items, double totalPrice) {
		super();
		this.items = items;
		this.totalPrice = totalPrice;
	}

	public Map<String, Integer> getItems() {
		return items;
	}
	
	public void setItems(Map<String, Integer> items) {
		this.items = items;
	}
	
	public double getTotalPrice() {
		return totalPrice;
	}
	
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
}