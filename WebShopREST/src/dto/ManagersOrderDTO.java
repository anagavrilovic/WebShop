package dto;

import beans.Order;

import java.util.ArrayList;

public class ManagersOrderDTO {
	private Order order;
	private String buyerFirstName;
	private String buyerLastName;
	private String delivererFirstName;
	private String delivererLastName;
	private ArrayList<ItemQuantityDTO> items = new ArrayList<ItemQuantityDTO>();
	
	
	public ManagersOrderDTO() {
		super();
	}

	public ManagersOrderDTO(Order order, String buyerFirstName, String buyerLastName, String delivererFirstName,
			String delivererLastName, ArrayList<ItemQuantityDTO> items) {
		super();
		this.order = order;
		this.buyerFirstName = buyerFirstName;
		this.buyerLastName = buyerLastName;
		this.delivererFirstName = delivererFirstName;
		this.delivererLastName = delivererLastName;
		this.items = items;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public String getBuyerFirstName() {
		return buyerFirstName;
	}

	public void setBuyerFirstName(String buyerFirstName) {
		this.buyerFirstName = buyerFirstName;
	}

	public String getBuyerLastName() {
		return buyerLastName;
	}

	public void setBuyerLastName(String buyerLastName) {
		this.buyerLastName = buyerLastName;
	}

	public String getDelivererFirstName() {
		return delivererFirstName;
	}

	public void setDelivererFirstName(String delivererFirstName) {
		this.delivererFirstName = delivererFirstName;
	}

	public String getDelivererLastName() {
		return delivererLastName;
	}

	public void setDelivererLastName(String delivererLastName) {
		this.delivererLastName = delivererLastName;
	}

	public ArrayList<ItemQuantityDTO> getItems() {
		return items;
	}

	public void setItems(ArrayList<ItemQuantityDTO> items) {
		this.items = items;
	}
}
