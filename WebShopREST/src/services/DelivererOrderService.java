package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Order;
import beans.User;
import dao.BuyerOrderDAO;
import dao.DelivererOrderDAO;
import dto.BuyersOrderDTO;
import dto.DeliverersOrderDTO;

@Path("/delivererOrders")
public class DelivererOrderService {
	@Context
	ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("delivererOrdersDAO") == null) {
			ctx.setAttribute("delivererOrdersDAO", new DelivererOrderDAO());
		}
	}
	
	@GET
	@Path("/getOpenOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<DeliverersOrderDTO> getBuyerOrders(@Context HttpServletRequest req) {
		DelivererOrderDAO dao = (DelivererOrderDAO)ctx.getAttribute("delivererOrdersDAO");

		HttpSession session= req.getSession(true);
        User user = (User)session.getAttribute("user");
        if(user == null)
        	return null;
        return dao.getOpenOrders(user);
	}
	
	@GET
	@Path("/requestDelivery/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String requestDelivery(@PathParam("id") String id, @Context HttpServletRequest req) {
		DelivererOrderDAO dao = (DelivererOrderDAO)ctx.getAttribute("delivererOrdersDAO");

		HttpSession session= req.getSession(true);
        User user = (User)session.getAttribute("user");
        if(user == null)
        	return null;
        return dao.requestDelivery(id, user.getUsername());
	}
	
	@GET
	@Path("/getDeliverersOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<DeliverersOrderDTO> getDeliverersOrders(@Context HttpServletRequest req) {
		DelivererOrderDAO dao = (DelivererOrderDAO)ctx.getAttribute("delivererOrdersDAO");

		HttpSession session= req.getSession(true);
        User user = (User)session.getAttribute("user");
        if(user == null)
        	return null;
        return dao.getDeliverersOrders(user);
	}
	
	@GET
	@Path("/deliverOrder/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String deliverOrder(@PathParam("id") String id) {
		DelivererOrderDAO dao = (DelivererOrderDAO)ctx.getAttribute("delivererOrdersDAO");

        return dao.deliverOrder(id);
	}
}
