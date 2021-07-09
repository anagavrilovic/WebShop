package beans;

public class Comment {

   private String content;
   private int mark;
   private String buyerUsername;
   private String restaurantID;
   private Boolean isDeleted = false;
   private CommentStatus status = CommentStatus.PENDING;
   
   public Comment() {}
   
	public Comment(String content, int mark, String buyerUsername, String restaurantID, Boolean isDeleted, CommentStatus status) {
		super();
		this.content = content;
		this.mark = mark;
		this.buyerUsername = buyerUsername;
		this.restaurantID = restaurantID;
		this.isDeleted = isDeleted;
		this.status = status;
	}

	public String getContent() {
		return content;
	}
	
	public void setContent(String content) {
		this.content = content;
	}
	
	public int getMark() {
		return mark;
	}
	
	public void setMark(int mark) {
		this.mark = mark;
	}
	
	public String getBuyerUsername() {
		return buyerUsername;
	}
	
	public void setBuyerUsername(String buyerUsername) {
		this.buyerUsername = buyerUsername;
	}
	
	public String getRestaurantID() {
		return restaurantID;
	}
	
	public void setRestaurantID(String restaurantID) {
		this.restaurantID = restaurantID;
	}
	
	public Boolean getIsDeleted() {
		return isDeleted;
	}
	
	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	
	public CommentStatus getStatus() {
		return status;
	}
	
	public void setStatus(CommentStatus status) {
		this.status = status;
	}
}