package dto;

import java.util.UUID;

import beans.Comment;
import beans.CommentStatus;

public class CommentDTO {
	private String content;
	private int mark;
	private String buyerUsername;
	private String restaurantID;
	private String restaurantName;
	private Boolean isDeleted = false;
	private CommentStatus status = CommentStatus.PENDING;
	private String id;
	
	public CommentDTO() {
		
	}

	public CommentDTO(String content, int mark, String buyerUsername, String restaurantID, String restaurantName,
			Boolean isDeleted, CommentStatus status) {
		super();
		this.content = content;
		this.mark = mark;
		this.buyerUsername = buyerUsername;
		this.restaurantID = restaurantID;
		this.restaurantName = restaurantName;
		this.isDeleted = isDeleted;
		this.status = status;
		this.id = UUID.randomUUID().toString();
	}
	
	public CommentDTO(Comment c) {
		this.content = c.getContent();
		this.mark = c.getMark();
		this.buyerUsername = c.getBuyerUsername();
		this.restaurantID = c.getRestaurantID();
		this.isDeleted = c.getIsDeleted();
		this.status = c.getStatus();
		this.id = c.getId();
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

	public String getRestaurantName() {
		return restaurantName;
	}

	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
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

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
}
