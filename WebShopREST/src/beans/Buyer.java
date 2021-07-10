package beans;

public class Buyer extends User {

   private double collectedPoints;
   private Boolean isDeleted = false;
   private Boolean isBlocked = false;
   private Boolean isSuspicious = false;
   
   private BuyerType buyerType;
   private ShoppingCart shoppingCart;
   
	public Buyer() {
		super();
	}
	
	public Buyer(double collectedPoints, Boolean isDeleted, Boolean isBlocked, BuyerType buyerType,
			ShoppingCart shoppingCart) {
		super();
		this.collectedPoints = collectedPoints;
		this.isDeleted = isDeleted;
		this.isBlocked = isBlocked;
		this.buyerType = buyerType;
		this.shoppingCart = shoppingCart;
	}

	public double getCollectedPoints() {
		return collectedPoints;
	}

	public void setCollectedPoints(double collectedPoints) {
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

	public Boolean getIsSuspicious() {
		return isSuspicious;
	}

	public void setIsSuspicious(Boolean isSuspicious) {
		this.isSuspicious = isSuspicious;
	}
}