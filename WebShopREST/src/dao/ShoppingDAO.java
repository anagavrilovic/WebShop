package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Buyer;
import beans.Deliverer;
import beans.Item;
import beans.Restaurant;
import beans.ShoppingCart;
import beans.User;
import dto.CartItemDTO;

public class ShoppingDAO {
	private ObjectMapper objectMapper = new ObjectMapper();
	
	public User addToBuyerCart(User user, CartItemDTO dto) {
		Buyer buyer = (Buyer)user;
		ShoppingCart cart = buyer.getShoppingCart();
		
		if(cart == null) {
			cart = new ShoppingCart();
		}
		
		HashMap<String, Integer> items = (HashMap<String, Integer>)cart.getItems();
		
		if(items == null) {
			items = new HashMap<String, Integer>();
		}
		
		if(items.putIfAbsent(dto.getProduct().getId(), dto.getQuantity()) != null) {
			int currentQuantity = items.get(dto.getProduct().getId());
			items.replace(dto.getProduct().getId(), dto.getQuantity() + currentQuantity);
		}
		cart.setTotalPrice(this.recalculateTotalPrice(cart));
		cart.setItems(items);
		buyer.setShoppingCart(cart);
		
		
		return updateBuyer(buyer);
	}
	
	public ArrayList<Buyer> getAllBuyers() {
		ArrayList<Buyer> buyers = new ArrayList<Buyer>();
		try {
			buyers = new ArrayList<Buyer>(Arrays.asList(objectMapper.readValue(new File("resources/buyers.json"), Buyer[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return buyers;
	}
	
	private ArrayList<Item> getAllItems() {
		ArrayList<Item> items = new ArrayList<Item>();
		try {
			items = new ArrayList<Item>(Arrays.asList(objectMapper.readValue(new File("resources/restaurantItems.json"), Item[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		return items;
	}
	
	private void addBuyer(Buyer buyer) {
		ArrayList<Buyer> buyers = getAllBuyers();
		buyers.add(buyer);
		
		saveBuyers(buyers); 
	}
	
	private void saveBuyers(ArrayList<Buyer> buyers) {
		try {
			objectMapper.writeValue(new File("resources/buyers.json"), buyers);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
	
	public Buyer updateBuyer(Buyer buyer) {
		ArrayList<Buyer> allBuyers = new ArrayList<Buyer>();
		allBuyers = getAllBuyers();
		int idx = -1;
		for(Buyer b : allBuyers) {
			if(b.getUsername().equals(buyer.getUsername())) {
				idx = allBuyers.indexOf(b);
			}
		}
		allBuyers.set(idx, buyer);
		saveBuyers(allBuyers);
		return buyer;
	}
	
	public Item getItemByID(String id) {
		ArrayList<Item> items = getAllItems();
		for(Item i : items) {
			if(i.getId().equals(id))
				return i;
		}
		return null;
	}
	
	public double recalculateTotalPrice(ShoppingCart cart) {
		double sum = 0.0;
		if(cart.getItems() == null || cart.getItems().size() == 0) {
			cart.setTotalPrice(0);
		}
		else {
			for (Map.Entry<String,Integer> entry : cart.getItems().entrySet()) {
				sum += this.getItemByID(entry.getKey()).getPrice() * entry.getValue();
			}
		}
		return sum;
	}

	public ArrayList<CartItemDTO> getCartItems(User user) {
		ArrayList<CartItemDTO> dtos = new ArrayList<CartItemDTO>();
		Buyer buyer = (Buyer)user;
		ShoppingCart cart = null;
		
		if(buyer != null)
			cart = buyer.getShoppingCart();
		
		if(cart == null) {
			cart = new ShoppingCart();
		}
		
		HashMap<String, Integer> items = (HashMap<String, Integer>)cart.getItems();
		
		if(items == null) {
			items = new HashMap<String, Integer>();
		}
		
		for (Map.Entry<String,Integer> entry : items.entrySet()) {
			dtos.add(new CartItemDTO(this.getItemByID(entry.getKey()), entry.getValue()));
		}
		
		return dtos;
	}

	public User updateBuyerCart(User user, CartItemDTO cartItem) {
		Buyer buyer = (Buyer)user;
		ShoppingCart cart = buyer.getShoppingCart();
		
		if(cart == null) {
			cart = new ShoppingCart();
		}
		
		HashMap<String, Integer> items = (HashMap<String, Integer>)cart.getItems();
		
		if(items == null) {
			items = new HashMap<String, Integer>();
		}
		
		for (Map.Entry<String,Integer> entry : cart.getItems().entrySet()) {
			if(entry.getKey().equals(cartItem.getProduct().getId())) {
				entry.setValue(cartItem.getQuantity());
			}
		}
		
		cart.setItems(items);
		buyer.setShoppingCart(cart);
		
		
		return updateBuyer(buyer);
	}

	public User removeFromCart(User user, CartItemDTO cartItem) {
		Buyer buyer = (Buyer)user;
		ShoppingCart cart = buyer.getShoppingCart();
		
		if(cart == null) {
			cart = new ShoppingCart();
		}
		
		HashMap<String, Integer> items = (HashMap<String, Integer>)cart.getItems();
		
		if(items == null) {
			items = new HashMap<String, Integer>();
		}
		
		String keyToRemove = "";
		for (Map.Entry<String,Integer> entry : cart.getItems().entrySet()) {
			if(entry.getKey().equals(cartItem.getProduct().getId())) {
				keyToRemove = entry.getKey();
			}
		}
		items.remove(keyToRemove);
		
		cart.setItems(items);
		buyer.setShoppingCart(cart);
		
		
		return updateBuyer(buyer);
	}

}
