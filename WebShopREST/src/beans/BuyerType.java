package beans;

import java.util.*;

public class BuyerType {

   private BuyerTypeName buyerTypeName;
   private double discount;
   private int requiredPointsForUpgrade;
   
   public BuyerType() {}
   
	public BuyerType(BuyerTypeName buyerTypeName, double discount, int requiredPointsForUpgrade) {
		super();
		this.buyerTypeName = buyerTypeName;
		this.discount = discount;
		this.requiredPointsForUpgrade = requiredPointsForUpgrade;
	}

	public BuyerTypeName getBuyerTypeName() {
		return buyerTypeName;
	}
	
	public void setBuyerTypeName(BuyerTypeName buyerTypeName) {
		this.buyerTypeName = buyerTypeName;
	}
	
	public double getDiscount() {
		return discount;
	}
	
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	
	public int getRequiredPointsForUpgrade() {
		return requiredPointsForUpgrade;
	}
	
	public void setRequiredPointsForUpgrade(int requiredPointsForUpgrade) {
		this.requiredPointsForUpgrade = requiredPointsForUpgrade;
	}
}