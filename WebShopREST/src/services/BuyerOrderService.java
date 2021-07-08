package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Order;
import beans.User;
import dao.BuyerOrderDAO;
import dao.ShoppingDAO;
import dto.CartItemDTO;

@Path("/buyerOrders")
public class BuyerOrderService {
	@Context
	ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("buyerOrdersDAO") == null) {
			ctx.setAttribute("buyerOrdersDAO", new BuyerOrderDAO());
		}
	}
	
	@GET
	@Path("/getBuyerOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Order> getBuyerOrders(@Context HttpServletRequest req) {
		BuyerOrderDAO dao = (BuyerOrderDAO)ctx.getAttribute("buyerOrdersDAO");

		HttpSession session= req.getSession(true);
        User user = (User)session.getAttribute("user");
        
        return dao.getBuyerOrders(user);
	}
}
