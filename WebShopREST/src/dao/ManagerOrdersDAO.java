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
import beans.OrderDeliveryRequest;
import beans.OrderItem;
import beans.OrderStatus;
import dto.DelivererDTO;
import dto.DeliverersOrderDTO;
import dto.ItemQuantityDTO;
import dto.ManagersOrderDTO;

public class ManagerOrdersDAO {
	
	private ShoppingDAO shoppingDAO = new ShoppingDAO();
	private DelivererOrderDAO delivererOrderDAO = new DelivererOrderDAO();
	private UserDAO userDAO = new UserDAO();
	
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

				if(o.getStatus().equals(OrderStatus.WAITING_FOR_DELIVERER))
					this.setDeliverersInRequest(dto);
				if(o.getStatus().equals(OrderStatus.IN_TRANSPORT))
					this.setDelivererNameInOrder(dto);
				
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
		dto.setDelivererFirstName(userDAO.getDelivererByUsername(dto.getOrder().getDeliverersUsername()).getFirstName());
		dto.setDelivererLastName(userDAO.getDelivererByUsername(dto.getOrder().getDeliverersUsername()).getLastName());
	}
	
	private void setDeliverersInRequest(ManagersOrderDTO dto) {
		ArrayList<OrderDeliveryRequest> requests = delivererOrderDAO.getOrderRequests();
		
		for(OrderDeliveryRequest odr : requests) {
			if(odr.getOrderID().equals(dto.getOrder().getId())) {
				Deliverer deliverer = userDAO.getDelivererByUsername(odr.getDelivererUsername());
				DelivererDTO delivererDTO = new DelivererDTO(deliverer.getUsername(), deliverer.getFirstName(), deliverer.getLastName());
				dto.getDeliverersInRequest().add(delivererDTO);
			}
		}
	}
	
	private void setItemsForOrders(ArrayList<ManagersOrderDTO> managersOrders) {
		ArrayList<OrderItem> orderItem = shoppingDAO.getOrderItems();
		
		for(ManagersOrderDTO dto : managersOrders) {
			
			for(OrderItem oi : orderItem) {
				if(oi.getOrderID().equals(dto.getOrder().getId())) {
					Item item = shoppingDAO.getItemByID(oi.getItemID());
					ItemQuantityDTO itemQuantity = new ItemQuantityDTO(item, oi.getItemQuantity());
					dto.getItems().add(itemQuantity);
				}
			}
			
		}
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

	public void changeStatusToPreparing(String orderID) {
		ArrayList<Order> orders = getOrders();
		for(Order o : orders) {
			if(o.getId().equals(orderID)) {
				o.setStatus(OrderStatus.PREPARING);
				break;
			}
		}
		saveOrders(orders);
	}
	
	public void changeStatusToWaitingForDeliverer(String orderID) {
		ArrayList<Order> orders = getOrders();
		for(Order o : orders) {
			if(o.getId().equals(orderID)) {
				o.setStatus(OrderStatus.WAITING_FOR_DELIVERER);
				break;
			}
		}
		saveOrders(orders);
	}

	public void approveDeliverersRequest(String delivererUsername, String orderID) {
		ArrayList<OrderDeliveryRequest> requests = delivererOrderDAO.getOrderRequests();
		ArrayList<OrderDeliveryRequest> requestsForRemoving = new ArrayList<OrderDeliveryRequest>();
		
		for(OrderDeliveryRequest odr : requests) {
			if(odr.getOrderID().equals(orderID)) {
				requestsForRemoving.add(odr);
			}
		}
		
		requests.removeAll(requestsForRemoving);
		delivererOrderDAO.saveDeliveryRequests(requests);
		
		ArrayList<Order> orders = this.getOrders();
		for(Order o : orders) {
			if(o.getId().equals(orderID)) {
				o.setStatus(OrderStatus.IN_TRANSPORT);
				o.setDeliverersUsername(delivererUsername);
				break;
			}
		}
		this.saveOrders(orders);
	}

	public void dispproveDeliverersRequest(String delivererUsername, String orderID) {
		ArrayList<OrderDeliveryRequest> requests = delivererOrderDAO.getOrderRequests();
		OrderDeliveryRequest requestForRemoving = new OrderDeliveryRequest();
		
		for(OrderDeliveryRequest odr : requests) {
			if(odr.getOrderID().equals(orderID) && odr.getDelivererUsername().equals(delivererUsername)) {
				requestForRemoving = odr;
				break;
			}
		}
		
		requests.remove(requestForRemoving);
		delivererOrderDAO.saveDeliveryRequests(requests);
	}
}
