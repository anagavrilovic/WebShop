package services;

import java.util.Collection;

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

import beans.User;
import dao.LoginDAO;
import dao.UserDAO;
import dto.CredentialsDTO;

@Path("/login")
public class LoginService {
	
	@Context
	ServletContext ctx;
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
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
	
	

}
