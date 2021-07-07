package dto;

import beans.Item;

public class CartItemDTO {
	private Item product;
	private int quantity;
	
	public CartItemDTO() {
	}
	
	public CartItemDTO(Item product, int quantity) {
		super();
		this.product = product;
		this.quantity = quantity;
	}
	public Item getProduct() {
		return product;
	}
	public void setProduct(Item product) {
		this.product = product;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	
	
}
