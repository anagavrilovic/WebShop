package beans;

import java.util.*;

public class ShoppingCart {
   
   private Map<Item, Integer> items;
   private double totalPrice;
   
   public ShoppingCart() {}
   
	public ShoppingCart(Map<Item, Integer> items, double totalPrice) {
		super();
		this.items = items;
		this.totalPrice = totalPrice;
	}

	public Map<Item, Integer> getItems() {
		return items;
	}
	
	public void setItems(Map<Item, Integer> items) {
		this.items = items;
	}
	
	public double getTotalPrice() {
		return totalPrice;
	}
	
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}
}