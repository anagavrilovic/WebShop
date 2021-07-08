package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Order;
import beans.User;
import dto.BuyersOrderDTO;

public class BuyerOrderDAO {
	
	private ObjectMapper objectMapper = new ObjectMapper();
	private RestaurantDAO restaurantDAO = new RestaurantDAO();
	
	
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
}
