package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

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
	public void addToCart(CartItemDTO cartItem, @Context HttpServletRequest req) {
		ShoppingDAO dao = (ShoppingDAO)ctx.getAttribute("shoppingDAO");

		HttpSession session= req.getSession(true);
        User user = (User)session.getAttribute("user");
        
        dao.addToBuyerCart(user, cartItem);
		
		
	}
}
