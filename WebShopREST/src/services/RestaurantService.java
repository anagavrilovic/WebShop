package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Restaurant;
import dao.RestaurantDAO;

@Path("/restaurants")
public class RestaurantService {
	@Context
	ServletContext ctx;
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("restaurantDAO") == null) {
			ctx.setAttribute("restaurantDAO", new RestaurantDAO());
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> getRestaurants() {
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurantDAO");
		return dao.getAll();
	}
	
	@GET
	@Path("/nameAtoZ")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> sortRestaurantsAtoZ() {
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurantDAO");
		for(Restaurant r : dao.getSortedAtoZ()) {
			System.out.println(r.getName());
		}
		return dao.getSortedAtoZ();
	}
	
	@POST
	@Path("/typeFilter")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Collection<Restaurant> filterRestaurantsByType(ArrayList<String> types) {
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurantDAO");
		for(String s : types) {
			System.out.println(s);
		}
		return dao.getFilteredByType(types);
	}
}
