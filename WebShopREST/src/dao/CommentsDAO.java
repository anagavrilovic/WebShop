package dao;

import java.io.File;
import java.util.ArrayList;
import java.util.Arrays;

import com.fasterxml.jackson.databind.ObjectMapper;

import beans.Comment;
import beans.Item;
import beans.Restaurant;

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
		comments.add(comment);
		this.updateRestaurantMark(comment);
		this.saveComments(comments);
		
	}

	private void updateRestaurantMark(Comment comment) {
		Restaurant restaurant = restaurantDAO.getByID(comment.getRestaurantID());
		
		int numberOfComments = this.getNumberOfCommentsForRestaurant(restaurant);
		
		double newMark = (restaurant.getMark()*numberOfComments + comment.getMark()) / (numberOfComments + 1);
		restaurant.setMark(newMark);
		restaurantDAO.updateRestaurant(restaurant);
	}

	private int getNumberOfCommentsForRestaurant(Restaurant restaurant) {
		ArrayList<Comment> comments = this.getAll();
		
		int numberOfComments = 0;
		for(Comment c : comments) {
			if(c.getRestaurantID().equals(restaurant.getId())) {
				numberOfComments++;
			}
		}
		
		return numberOfComments;
	}
	
	
}
