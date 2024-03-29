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

import beans.Administrator;
import beans.Buyer;
import beans.Deliverer;
import beans.Item;
import beans.Manager;
import beans.Restaurant;
import beans.User;
import dao.CommentsDAO;
import dao.LoginDAO;
import dao.RestaurantDAO;
import dao.UserDAO;
import dto.ManagerDTO;

@Path("/users")
public class UserService {
	@Context
	ServletContext ctx;
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		if (ctx.getAttribute("userDAO") == null) {
			ctx.setAttribute("userDAO", new UserDAO());
		}
	}
	
	@POST
	@Path("/updateBuyer")
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateBuyer(Buyer user) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.updateBuyer(user);
	}
	
	@POST
	@Path("/updateDeliverer")
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateDeliverer(Deliverer user) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.updateDeliverer(user);
	}
	
	@POST
	@Path("/updateManager")
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateManager(Manager user) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.updateManager(user);
	}
	
	@POST
	@Path("/updateAdministrator")
	@Consumes(MediaType.APPLICATION_JSON)
	public void updateAdministrator(Administrator user) {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		dao.updateAdministrator(user);
	}
	
	@GET
	@Path("/getAdministrators")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Administrator> getAllAdministrators() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getAllAdministrators();
	}
	
	@GET
	@Path("/getManagers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<ManagerDTO> getAllManagersWithRestaurants() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getAllManagersWithRestaurants();
	}
	
	@GET
	@Path("/freeManagers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Manager> getFreeManagers() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getFreeManagers();
	}
	
	@GET
	@Path("/getDeliverers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Deliverer> getAllDeliverers() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getAllDeliverers();
	}
	
	@GET
	@Path("/getBuyers")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Buyer> getAllBuyers() {
		UserDAO dao = (UserDAO) ctx.getAttribute("userDAO");
		return dao.getAllBuyers();
	}
	
	@POST
	@Path("/addManager")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public ManagerDTO registerManager(Manager manager) {
		UserDAO dao = (UserDAO)ctx.getAttribute("userDAO");
		return dao.addNewManager(manager);
	}
	
	@POST
	@Path("/addDeliverer")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Deliverer registerDeliverer(Deliverer deliverer) {
		UserDAO dao = (UserDAO)ctx.getAttribute("userDAO");
		return dao.addNewDeliverer(deliverer);
	}
	

	@POST
	@Path("/blockUser")
	@Consumes(MediaType.APPLICATION_JSON)
	public User blockUser(User user) {
		UserDAO dao = (UserDAO)ctx.getAttribute("userDAO");
		return dao.blockUser(user);
	}
	
	@POST
	@Path("/unblockUser")
	@Consumes(MediaType.APPLICATION_JSON)
	public User unblockUser(User user) {
		UserDAO dao = (UserDAO)ctx.getAttribute("userDAO");
		return dao.unblockUser(user);
	}
	
	@POST
	@Path("/deleteUser")
	@Consumes(MediaType.APPLICATION_JSON)
	public User deleteUser(User user) {
		UserDAO dao = (UserDAO)ctx.getAttribute("userDAO");
		return dao.deleteUser(user);
	}
	
}
