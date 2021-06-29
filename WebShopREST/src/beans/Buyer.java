package beans;

import java.util.*;

public class Buyer extends User {

   private int collectedPoints;
   private Boolean isDeleted = false;
   private Boolean isBlocked = false;
   
   private BuyerType buyerType;
   private ShoppingCart shoppingCart;
   
	public Buyer() {
		super();
	}
	
	public Buyer(int collectedPoints, Boolean isDeleted, Boolean isBlocked, BuyerType buyerType,
			ShoppingCart shoppingCart) {
		super();
		this.collectedPoints = collectedPoints;
		this.isDeleted = isDeleted;
		this.isBlocked = isBlocked;
		this.buyerType = buyerType;
		this.shoppingCart = shoppingCart;
	}

	public int getCollectedPoints() {
		return collectedPoints;
	}

	public void setCollectedPoints(int collectedPoints) {
		this.collectedPoints = collectedPoints;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Boolean getIsBlocked() {
		return isBlocked;
	}

	public void setIsBlocked(Boolean isBlocked) {
		this.isBlocked = isBlocked;
	}

	public BuyerType getBuyerType() {
		return buyerType;
	}

	public void setBuyerType(BuyerType buyerType) {
		this.buyerType = buyerType;
	}

	public ShoppingCart getShoppingCart() {
		return shoppingCart;
	}

	public void setShoppingCart(ShoppingCart shoppingCart) {
		this.shoppingCart = shoppingCart;
	}
}