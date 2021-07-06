package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Buyer;
import beans.User;
import dao.LoginDAO;
import dto.CredentialsDTO;

@Path("/login")
public class LoginService {
	
	@Context
	ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("loginDAO") == null) {
			ctx.setAttribute("loginDAO", new LoginDAO());
		}
	}
	
	@POST
	@Path("/handleLogin")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public User handleLogin(CredentialsDTO credentials, @Context HttpServletRequest req) {
		LoginDAO dao = (LoginDAO)ctx.getAttribute("loginDAO");
		User user = dao.getUser(credentials);
		if(user != null) {
			HttpSession session= req.getSession(true);
	        session.setAttribute("user", user);
		}
		return user;
		
	}
	
	@GET
	@Path("/loginCheck")
	@Produces(MediaType.APPLICATION_JSON)
	public User checkLogin(@Context HttpServletRequest req) {
		HttpSession session= req.getSession(true);
        return (User)session.getAttribute("user");
	}
	
	
	@POST
	@Path("/logout")
	public void logOut(@Context HttpServletRequest request) {
		request.getSession().invalidate();
	}
	
	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Buyer registerBuyer(Buyer buyer, @Context HttpServletRequest req) {
		LoginDAO dao = (LoginDAO)ctx.getAttribute("loginDAO");
		Buyer newBuyer = dao.registerBuyer(buyer);
		req.getSession().setAttribute("user", newBuyer);
		return newBuyer;
	}
	
	@GET
	@Path("/validateUsername/{username}")
	public Boolean usernameExists(@PathParam("username") String username) {
		LoginDAO dao = (LoginDAO)ctx.getAttribute("loginDAO");
		return dao.usernameExists(username);
	}
	
	

}
