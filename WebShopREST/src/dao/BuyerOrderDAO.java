package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Order;
import beans.OrderItem;
import beans.User;
import dto.BuyersOrderDTO;
import dto.CartItemDTO;

public class BuyerOrderDAO {
	
	private ObjectMapper objectMapper = new ObjectMapper();
	private RestaurantDAO restaurantDAO = new RestaurantDAO();
	private ShoppingDAO shoppingDAO = new ShoppingDAO();
	
	
	public ArrayList<BuyersOrderDTO> getBuyerOrders(User user) {
		ArrayList<Order> allOrders = this.getOrders();
		ArrayList<BuyersOrderDTO> buyersOrders = new ArrayList<BuyersOrderDTO>();
		
		for(Order o : allOrders) {
			if(o.getBuyersUsername().equals(user.getUsername())) {
				BuyersOrderDTO dto = new BuyersOrderDTO(o);
				dto.setRestaurantName(restaurantDAO.getRestaurantNameByID(o.getRestaurantID()));
				dto.setRestaurantType(restaurantDAO.getRestaurantByID(o.getRestaurantID()).getType());
				buyersOrders.add(dto);
			}
		}
		
		return buyersOrders;
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

	public ArrayList<CartItemDTO> getItemsByOrderId(String id) {
		ArrayList<CartItemDTO> cartItems = new ArrayList<CartItemDTO>();
		
		ArrayList<OrderItem> orderItems = shoppingDAO.getOrderItems();
		for(OrderItem item : orderItems) {
			if(item.getOrderID().equals(id)) {
				CartItemDTO dto = new CartItemDTO(shoppingDAO.getItemByID(item.getItemID()), item.getItemQuantity());
				cartItems.add(dto);
			}
		}
		return cartItems;
	}
}
