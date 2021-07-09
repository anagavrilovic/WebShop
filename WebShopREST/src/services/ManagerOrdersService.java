package services;

import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Buyer;
import beans.Manager;
import dao.ManagerOrdersDAO;
import dto.ManagersOrderDTO;

@Path("/managersOrders")
public class ManagerOrdersService {
	
	@Context
	ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("managerOrdersDAO") == null) {
			ctx.setAttribute("managerOrdersDAO", new ManagerOrdersDAO());
		}
	}
	
	@GET
	@Path("/")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<ManagersOrderDTO> getAllOrders(@Context HttpServletRequest request) {
		ManagerOrdersDAO dao = (ManagerOrdersDAO)ctx.getAttribute("managerOrdersDAO");
		Manager manager = (Manager)request.getSession().getAttribute("user");
		return dao.getAllOrders(manager);
	}
	
	
	@GET
	@Path("/buyers")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Buyer> getManagersBuyers(@Context HttpServletRequest request) {
		ManagerOrdersDAO dao = (ManagerOrdersDAO)ctx.getAttribute("managerOrdersDAO");
		Manager manager = (Manager)request.getSession().getAttribute("user");
		return dao.getManagersBuyers(manager.getRestaurantID());
	}
	
	
	@GET
	@Path("/preparing/{id}")
	public void changeStatusToPreparing(@PathParam("id") String orderID) {
		ManagerOrdersDAO dao = (ManagerOrdersDAO)ctx.getAttribute("managerOrdersDAO");
		dao.changeStatusToPreparing(orderID);
	}
	
	
	@GET
	@Path("/waitingForDeliverer/{id}")
	public void changeStatusToWaitingForDeliverer(@PathParam("id") String orderID) {
		ManagerOrdersDAO dao = (ManagerOrdersDAO)ctx.getAttribute("managerOrdersDAO");
		dao.changeStatusToWaitingForDeliverer(orderID);
	}
	
	
	@GET
	@Path("/approveRequest")
	public void approveDeliverersRequest(@QueryParam("delivererUsername") String delivererUsername, @QueryParam("orderID") String orderID) {
		ManagerOrdersDAO dao = (ManagerOrdersDAO)ctx.getAttribute("managerOrdersDAO");
		dao.approveDeliverersRequest(delivererUsername, orderID);
	}
	
	@GET
	@Path("/dispproveRequest")
	public void dispproveDeliverersRequest(@QueryParam("delivererUsername") String delivererUsername, @QueryParam("orderID") String orderID) {
		ManagerOrdersDAO dao = (ManagerOrdersDAO)ctx.getAttribute("managerOrdersDAO");
		dao.dispproveDeliverersRequest(delivererUsername, orderID);
	}
	
}
