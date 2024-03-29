package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.UUID;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Comment;
import beans.CommentStatus;
import beans.Item;
import beans.Manager;
import beans.Restaurant;
import beans.User;
import dto.CommentDTO;

public class CommentsDAO {
	
	ObjectMapper objectMapper = new ObjectMapper();
	RestaurantDAO restaurantDAO = new RestaurantDAO();
	
	public CommentsDAO() {}
	
	public ArrayList<Comment> getAll() {
		ArrayList<Comment> allComments = new ArrayList<Comment>();
		try {
			allComments = new ArrayList<Comment>(Arrays.asList(objectMapper.readValue(new File("resources/comments.json"), Comment[].class)));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return allComments;
	}
	
	private void saveComments(ArrayList<Comment> comments) {
		try {
			objectMapper.writeValue(new File("resources/comments.json"), comments);
		} catch (Exception e) {
			e.printStackTrace();
		} 
	}
	
	public void saveComment(Comment comment) {
		ArrayList<Comment> comments = this.getAll();
		comment.setId(UUID.randomUUID().toString());
		comments.add(comment);
		//this.updateRestaurantMark(comment);
		this.saveComments(comments);
		
	}

	private void updateRestaurantMark(Comment comment) {
		Restaurant restaurant = restaurantDAO.getByID(comment.getRestaurantID());
		
		int numberOfComments = this.getNumberOfCommentsForRestaurant(restaurant);
		double newMark;
		if(restaurant.getMark() == 0 || numberOfComments == 0) {
			newMark = comment.getMark();
		}
		else
			newMark = (restaurant.getMark()*numberOfComments + comment.getMark()) / (numberOfComments + 1);
		restaurant.setMark(newMark);
		System.out.println(newMark);
		restaurantDAO.updateRestaurant(restaurant);
	}

	private int getNumberOfCommentsForRestaurant(Restaurant restaurant) {
		ArrayList<Comment> comments = this.getAll();
		
		int numberOfComments = 0;
		for(Comment c : comments) {
			if(c.getRestaurantID().equals(restaurant.getId()) && c.getStatus() == CommentStatus.ACCEPTED) {
				numberOfComments++;
			}
		}
		
		return numberOfComments;
	}

	public ArrayList<CommentDTO> getManagerComments(User user) {
		ArrayList<CommentDTO> managerComments = new ArrayList<CommentDTO>();
		String restaurantID = ((Manager)user).getRestaurantID();
		ArrayList<Comment> allComments = getAll();
		for(Comment c : allComments) {
			if(c.getRestaurantID().equals(restaurantID)) {
				CommentDTO dto = new CommentDTO(c);
				dto.setRestaurantName(restaurantDAO.getRestaurantNameByID(restaurantID));
				managerComments.add(dto);
			}
		}
		return managerComments;
	}

	public String acceptComment(String id) {
		ArrayList<Comment> allComments = getAll();
		for(Comment c : allComments) {
			if(c.getId().equals(id)) {
				c.setStatus(CommentStatus.ACCEPTED);
			}
		}
		this.updateRestaurantMark(getCommentById(id));
		saveComments(allComments);
		return id;
	}

	public String rejectComment(String id) {
		ArrayList<Comment> allComments = getAll();
		for(Comment c : allComments) {
			if(c.getId().equals(id)) {
				c.setStatus(CommentStatus.REJECTED);
			}
		}
		saveComments(allComments);
		return id;
	}
	
	public Comment getCommentById(String id) {
		ArrayList<Comment> allComments = getAll();
		for(Comment c : allComments) {
			if(c.getId().equals(id)) {
				return c;
			}
		}
		return null;
	}

	public ArrayList<CommentDTO> getAcceptedComments(String restaurantId) {
		ArrayList<CommentDTO> acceptedComments = new ArrayList<CommentDTO>();
		ArrayList<Comment> allComments = getAll();
		for(Comment c : allComments) {
			if(c.getRestaurantID().equals(restaurantId) && c.getStatus() == CommentStatus.ACCEPTED) {
				CommentDTO dto = new CommentDTO(c);
				dto.setRestaurantName(restaurantDAO.getRestaurantNameByID(restaurantId));
				acceptedComments.add(dto);
			}
		}
		return acceptedComments;
		
	}

	public ArrayList<CommentDTO> getAdminComments() {
		ArrayList<CommentDTO> adminComments = new ArrayList<CommentDTO>();
		ArrayList<Comment> allComments = getAll();
		for(Comment c : allComments) {
			CommentDTO dto = new CommentDTO(c);
			dto.setRestaurantName(restaurantDAO.getRestaurantNameByID(c.getRestaurantID()));
			adminComments.add(dto);

		}
		return adminComments;
	}
	
	
}
