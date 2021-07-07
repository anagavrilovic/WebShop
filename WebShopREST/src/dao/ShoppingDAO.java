package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Buyer;
import beans.Deliverer;
import beans.Item;
import beans.ShoppingCart;
import beans.User;
import dto.CartItemDTO;

public class ShoppingDAO {
	private ObjectMapper objectMapper = new ObjectMapper();
	
	public void addToBuyerCart(User user, CartItemDTO dto) {
		Buyer buyer = (Buyer)user;
		ShoppingCart cart = buyer.getShoppingCart();
		HashMap<String, Integer> items = (HashMap<String, Integer>)cart.getItems();
		
		if(items.putIfAbsent(dto.getProduct().getId(), dto.getQuantity()) != null) {
			int currentQuantity = items.get(dto.getProduct().getId());
			items.replace(dto.getProduct().getId(), dto.getQuantity() + currentQuantity);
		}
		
		
		
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
	
	private void saveBuyer(Buyer buyer) {
		ArrayList<Buyer> buyers = getAllBuyers();
		buyers.add(buyer);
		
		try {
			objectMapper.writeValue(new File("resources/buyers.json"), buyers);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
	
	/*public Item updateBuyer(Item item) {
		ArrayList<Item> allItems = new ArrayList<Item>();
		allItems = getItems();
		int idx = -1;
		for(Item i : allItems) {
			if(i.getId().equals(item.getId())) {
				idx = allItems.indexOf(i);
			}
		}
		allItems.set(idx, item);
		saveItems(allItems);
		return item;
	}*/

}
