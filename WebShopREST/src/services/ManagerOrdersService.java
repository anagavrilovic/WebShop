package services;

import java.io.File;
import java.util.ArrayList;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

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
	
	
	
	
	
}
