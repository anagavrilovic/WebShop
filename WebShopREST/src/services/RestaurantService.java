package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Buyer;
import beans.Item;
import beans.Manager;
import beans.Restaurant;
import beans.User;
import dao.LoginDAO;
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
	@Path("/validateItemName/{name}")
	public Boolean itemNameExists(@PathParam("name") String name, @Context HttpServletRequest req) {
		User user = (User)req.getSession().getAttribute("user");
		String restaurantId = ((Manager)user).getRestaurantID();
		
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurantDAO");
		return dao.itemExists(name, restaurantId);
	}
	
	@POST
	@Path("/addNewItem")
	@Consumes(MediaType.APPLICATION_JSON)
	public Item addNewItem(Item item, @Context HttpServletRequest req) {
		RestaurantDAO dao = (RestaurantDAO) ctx.getAttribute("restaurantDAO");
		User user = (User)req.getSession().getAttribute("user");
		String restaurantId = ((Manager)user).getRestaurantID();
		return dao.addNewItem(item, restaurantId);
	}
}
