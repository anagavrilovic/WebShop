package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Buyer;
import beans.Deliverer;
import beans.Item;
import beans.Manager;
import beans.Order;
import beans.OrderItem;
import dto.ManagersOrderDTO;

public class ManagerOrdersDAO {
	
	private ShoppingDAO shoppingDAO = new ShoppingDAO();
	private ObjectMapper objectMapper = new ObjectMapper();
	
	public ManagerOrdersDAO() {}

	public ArrayList<ManagersOrderDTO> getAllOrders(Manager manager) {
		ArrayList<Order> orders = getOrders();
		ArrayList<ManagersOrderDTO> managersOrders = new ArrayList<ManagersOrderDTO>();
		
		for(Order o : orders) {
			if(o.getRestaurantID().equals(manager.getRestaurantID())) {
				ManagersOrderDTO dto = new ManagersOrderDTO();
				dto.setOrder(o);
				
				setBuyerNameInOrder(dto);
				setDelivererNameInOrder(dto);
				
				managersOrders.add(dto);
			}
		}
		
		setItemsForOrders(managersOrders);
		
		return managersOrders;
	}

	private void setBuyerNameInOrder(ManagersOrderDTO dto) {
		ArrayList<Buyer> buyers = new UserDAO().getAllBuyers();
		for(Buyer b : buyers) {
			if(b.getUsername().equals(dto.getOrder().getBuyersUsername())) {
				dto.setBuyerFirstName(b.getFirstName());
				dto.setBuyerLastName(b.getLastName());
				return;
			}
		}
	}
	
	private void setDelivererNameInOrder(ManagersOrderDTO dto) {
		ArrayList<Deliverer> deliverers = new UserDAO().getAllDeliverers();
		// TODO
	}
	
	private void setItemsForOrders(ArrayList<ManagersOrderDTO> managersOrders) {
		for(ManagersOrderDTO dto : managersOrders) {
			ArrayList<String> itemIDs = getItemsIDsForOrder(dto.getOrder().getId());
			
			for(String id : itemIDs) {
				Item item = shoppingDAO.getItemByID(id);
				dto.getItems().add(item);
			}
		}
	}

	private ArrayList<String> getItemsIDsForOrder(String id) {
		ArrayList<OrderItem> orderItem = shoppingDAO.getOrderItems();
		ArrayList<String> itemIDs = new ArrayList<String>();
		
		for(OrderItem oi : orderItem) {
			if(oi.getOrderID().equals(id)) {
				itemIDs.add(oi.getItemID());
			}
		}
		
		return itemIDs;
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
	
	private void saveOrders(ArrayList<Order> orders) {
		try {
			objectMapper.writeValue(new File("resources/orders.json"), orders);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
}
