package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Buyer;
import beans.Order;
import beans.OrderDeliveryRequest;
import beans.OrderStatus;
import beans.User;
import dto.DeliverersOrderDTO;

public class DelivererOrderDAO {
	private BuyerOrderDAO buyerOrderDAO = new BuyerOrderDAO();
	private ObjectMapper objectMapper = new ObjectMapper();
	private RestaurantDAO restaurantDAO = new RestaurantDAO();
	private ShoppingDAO shoppingDAO = new ShoppingDAO();
	
	public ArrayList<DeliverersOrderDTO> getOpenOrders(User user) {
		// sve porudzbine u statusu WAITING_FOR_DELIVERER za koje dostavljac nije poslao zahtev
		// poslat zahtev se cuva u fajlu orderDeliveryRequests.json
		
		ArrayList<OrderDeliveryRequest> requests = getOrderRequests();
		ArrayList<Order> allOrders = buyerOrderDAO.getOrders();
		ArrayList<DeliverersOrderDTO> openOrders = new ArrayList<DeliverersOrderDTO>();
		
		for(Order o : allOrders) {
			if(o.getStatus() == OrderStatus.WAITING_FOR_DELIVERER && !isOrderInRequests(user.getUsername(), requests)) {
				DeliverersOrderDTO dto = new DeliverersOrderDTO(o);
				dto.setRestaurantName(restaurantDAO.getRestaurantNameByID(o.getRestaurantID()));
				dto.setRestaurantType(restaurantDAO.getRestaurantByID(o.getRestaurantID()).getType());
				dto.setDeliverersUsername(user.getUsername());
				dto.setBuyerName(this.getBuyersNameByUsername(o.getBuyersUsername()));
				openOrders.add(dto);
			}
		}
		return openOrders;
	}
	
	public ArrayList<OrderDeliveryRequest> getOrderRequests(){
		ArrayList<OrderDeliveryRequest> requests = new ArrayList<OrderDeliveryRequest>();
		try {
			requests = new ArrayList<OrderDeliveryRequest>(Arrays.asList(objectMapper.readValue(new File("resources/orderDeliveryRequests.json"), OrderDeliveryRequest[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		} 
		
		return requests;
	}
	
	public boolean isOrderInRequests(String delivererUsername, ArrayList<OrderDeliveryRequest> requests) {
		if(requests.size() == 0) {
			return false;
		}
		for(OrderDeliveryRequest req : requests) {
			if(req.getDelivererUsername().equals(delivererUsername))
				return true;
		}
		return false;
	}
	
	public String getBuyersNameByUsername(String buyerUsername) {
		ArrayList<Buyer> allBuyers = shoppingDAO.getAllBuyers();
		for(Buyer b : allBuyers) {
			if(b.getUsername().equals(buyerUsername)) {
				return b.getFirstName() + " " + b.getLastName();
			}
		}
		return "";
	}

}
