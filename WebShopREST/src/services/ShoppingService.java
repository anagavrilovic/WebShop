package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Order;
import beans.User;
import dao.LoginDAO;
import dao.ShoppingDAO;
import dto.CartItemDTO;
import dto.CredentialsDTO;

@Path("/shopping")
public class ShoppingService {
	@Context
	ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("shoppingDAO") == null) {
			ctx.setAttribute("shoppingDAO", new ShoppingDAO());
		}
	}
	
	@POST
	@Path("/addToCart")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User addToCart(CartItemDTO cartItem, @Context HttpServletRequest req) {
		ShoppingDAO dao = (ShoppingDAO)ctx.getAttribute("shoppingDAO");

		HttpSession session= req.getSession(true);
        User user = (User)session.getAttribute("user");
        
        return dao.addToBuyerCart(user, cartItem);
		
		
	}
	
	@POST
	@Path("/updateCart")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User updateCart(CartItemDTO cartItem, @Context HttpServletRequest req) {
		ShoppingDAO dao = (ShoppingDAO)ctx.getAttribute("shoppingDAO");

		HttpSession session= req.getSession(true);
        User user = (User)session.getAttribute("user");
        
        return dao.updateBuyerCart(user, cartItem);
		
		
	}
	
	@POST
	@Path("/removeFromCart")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User removeFromCart(CartItemDTO cartItem, @Context HttpServletRequest req) {
		ShoppingDAO dao = (ShoppingDAO)ctx.getAttribute("shoppingDAO");

		HttpSession session= req.getSession(true);
        User user = (User)session.getAttribute("user");
        
        return dao.removeFromCart(user, cartItem);

	}
	
	@GET
	@Path("/getCartItems")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<CartItemDTO> getCartItems(@Context HttpServletRequest req) {
		ShoppingDAO dao = (ShoppingDAO)ctx.getAttribute("shoppingDAO");

		HttpSession session= req.getSession(true);
        User user = (User)session.getAttribute("user");
        
        return dao.getCartItems(user);
	}
	
	@POST
	@Path("/isCartUnique")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Boolean isCartUnique(CartItemDTO cartItem, @Context HttpServletRequest req) {
		ShoppingDAO dao = (ShoppingDAO)ctx.getAttribute("shoppingDAO");

		HttpSession session= req.getSession(true);
        User user = (User)session.getAttribute("user");
        
        return dao.isCartUnique(user, cartItem);

	}
	
	@GET
	@Path("/finishOrder")
	@Produces(MediaType.APPLICATION_JSON)
	public Order finishOrder(@Context HttpServletRequest req) {
		ShoppingDAO dao = (ShoppingDAO)ctx.getAttribute("shoppingDAO");

		HttpSession session= req.getSession(true);
        User user = (User)session.getAttribute("user");
        
        return dao.finishOrder(user);
	}
}
