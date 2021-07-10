package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Buyer;
import beans.Order;
import beans.OrderItem;
import beans.OrderStatus;
import beans.User;
import dto.BuyersOrderDTO;
import dto.CartItemDTO;

public class BuyerOrderDAO {
	
	private ObjectMapper objectMapper = new ObjectMapper();
	private RestaurantDAO restaurantDAO = new RestaurantDAO();
	private ShoppingDAO shoppingDAO = new ShoppingDAO();
	private UserDAO userDAO = new UserDAO();
	
	
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

	public Order cancelOrder(String id) {
		Order order = getOrderById(id);
		order.setStatus(OrderStatus.CANCELED);
		decreaseBuyersPoints(order);
		return this.updateOrder(order);
	}
	
	private void decreaseBuyersPoints(Order order) {
		Buyer buyer = userDAO.getBuyerByUsername(order.getBuyersUsername());
		buyer.setCollectedPoints(buyer.getCollectedPoints() - order.getPrice()/1000 * 133 * 4);
		shoppingDAO.updateBuyer(buyer);
	}

	public Order getOrderById(String id) {
		ArrayList<Order> orders = shoppingDAO.getOrders();
		for(Order o : orders) {
			if(o.getId().equals(id))
				return o;
		}
		return null;
	}
	
	public Order updateOrder(Order order) {
		ArrayList<Order> allOrders = shoppingDAO.getOrders();
		int idx = -1;
		for(Order o : allOrders) {
			if(o.getId().equals(order.getId())) {
				idx = allOrders.indexOf(o);
			}
		}
		allOrders.set(idx, order);
		this.shoppingDAO.saveOrders(allOrders);
		return order;
	}
}
