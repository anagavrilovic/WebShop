package dao;

import java.io.File;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Buyer;
import beans.BuyerType;
import beans.BuyerTypeName;
import beans.Deliverer;
import beans.Item;
import beans.Order;
import beans.OrderItem;
import beans.OrderStatus;
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

	public Boolean isCartUnique(User user, CartItemDTO cartItem) {
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
			if(!this.getItemByID(entry.getKey()).getRestaurantID().equals(cartItem.getProduct().getRestaurantID())) {
				return false;
			}
		}
		return true;
	}

	
	// ORDERS
	
	public Order finishOrder(User user) {
		Buyer buyer = (Buyer)user;
		ShoppingCart cart = buyer.getShoppingCart();
		
		if(cart == null) {
			cart = new ShoppingCart();
		}
		
		HashMap<String, Integer> items = (HashMap<String, Integer>)cart.getItems();
		
		if(items == null) {
			items = new HashMap<String, Integer>();
		}
		
		String firstKey = (String)items.keySet().toArray()[0];
		String restaurantId = this.getItemByID(firstKey).getRestaurantID();
		double totalPrice = cart.getTotalPrice();
		Date date = new Date(); 
		
		Order order = new Order(date, totalPrice, OrderStatus.PROCESSING, restaurantId, buyer.getUsername());
		int orderSize = this.getOrders().size();
		order.setId(this.generateOrderID(orderSize));
		
		ArrayList<OrderItem> orderItems = new ArrayList<OrderItem>();
		
		for (Map.Entry<String,Integer> entry : items.entrySet()) {
			orderItems.add(new OrderItem(order.getId(), entry.getKey(), entry.getValue()));
		}
		
		buyer.setShoppingCart(new ShoppingCart());
		addPointsToBuyer(buyer, order);
		this.updateBuyer(buyer);
		
		order.setPrice(order.getPrice() - order.getPrice()*buyer.getBuyerType().getDiscount());
		this.addNewOrder(order);
		this.addNewOrderItems(orderItems);
		
		return order;
	}
	
	
	private void addPointsToBuyer(Buyer buyer, Order order) {
		buyer.setCollectedPoints(buyer.getCollectedPoints() + order.getPrice()/1000 * 133);
		BuyerType buyerType;
		
		if(buyer.getCollectedPoints() > 2000) {
			switch (buyer.getBuyerType().getBuyerTypeName()) {
			case REGULAR:
				buyerType = new BuyerType(BuyerTypeName.BRONZE, 0.03, 2000);
				buyer.setBuyerType(buyerType);
				buyer.setCollectedPoints(buyer.getCollectedPoints() % 2000);
				break;
			case BRONZE:
				buyerType = new BuyerType(BuyerTypeName.SILVER, 0.05, 2000);
				buyer.setBuyerType(buyerType);
				buyer.setCollectedPoints(buyer.getCollectedPoints() % 2000);
				break;
			case SILVER:
				buyerType = new BuyerType(BuyerTypeName.GOLD, 0.1, 2000);
				buyer.setBuyerType(buyerType);
				buyer.setCollectedPoints(buyer.getCollectedPoints() % 2000);
				break;
			}
		}
		
	}

	public ArrayList<OrderItem> getOrderItems(){
		ArrayList<OrderItem> items = new ArrayList<OrderItem>();
		try {
			items = new ArrayList<OrderItem>(Arrays.asList(objectMapper.readValue(new File("resources/orderItems.json"), OrderItem[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
		return items;
	}
	
	public ArrayList<Order> getOrders(){
		ArrayList<Order> orders = new ArrayList<Order>();
		try {
			orders = new ArrayList<Order>(Arrays.asList(objectMapper.readValue(new File("resources/orders.json"), Order[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
		return orders;
	}
	
	public void addNewOrder(Order order) {
		ArrayList<Order> orders = this.getOrders();
		orders.add(order);
		this.saveOrders(orders);
	}
	
	public void addNewOrderItem(OrderItem orderItem) {
		ArrayList<OrderItem> orderItems = this.getOrderItems();
		orderItems.add(orderItem);
		this.saveOrderItems(orderItems);
	}
	
	public void addNewOrderItems(ArrayList<OrderItem> orderItems) {
		ArrayList<OrderItem> allOrderItems = this.getOrderItems();
		for(OrderItem item : orderItems)
			allOrderItems.add(item);
		this.saveOrderItems(allOrderItems);
	}
	
	public void saveOrders(ArrayList<Order> orders) {
		try {
			objectMapper.writeValue(new File("resources/orders.json"), orders);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
	
	public void saveOrderItems(ArrayList<OrderItem> orderItems) {
		try {
			objectMapper.writeValue(new File("resources/orderItems.json"), orderItems);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
	
	public String generateOrderID(int size) {
		String id = size + 1 + "";
		int numOfDigits = id.length();
		StringBuilder sb = new StringBuilder();
		for(int i = 0; i < (10 - numOfDigits); ++i) {
			sb.append("0");
		}
		sb.append(id);
		return sb.toString();
	}

	
	

}
