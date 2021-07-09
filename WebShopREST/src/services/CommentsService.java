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
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Comment;
import beans.User;
import dao.CommentsDAO;
import dao.DelivererOrderDAO;
import dto.CommentDTO;
import dto.DeliverersOrderDTO;

@Path("/comments")
public class CommentsService {

	@Context
	ServletContext ctx;
	
	@PostConstruct
	public void init() {
		if (ctx.getAttribute("commentsDAO") == null) {
			ctx.setAttribute("commentsDAO", new CommentsDAO());
		}
	}
	
	@POST
	@Path("/add")
	@Consumes(MediaType.APPLICATION_JSON)
	public void addComment(Comment comment) {
		CommentsDAO dao = (CommentsDAO) ctx.getAttribute("commentsDAO");
		dao.saveComment(comment);
	}
	
	@GET
	@Path("/getManagerComments")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<CommentDTO> getManagerComments(@Context HttpServletRequest req) {
		CommentsDAO dao = (CommentsDAO)ctx.getAttribute("commentsDAO");

		HttpSession session= req.getSession(true);
        User user = (User)session.getAttribute("user");
        if(user == null)
        	return null;
        
        return dao.getManagerComments(user);
	}
	
	@GET
	@Path("/acceptComment/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String acceptComment(@PathParam("id") String id) {
		CommentsDAO dao = (CommentsDAO)ctx.getAttribute("commentsDAO");

        return dao.acceptComment(id);
	}
	
	@GET
	@Path("/rejectComment/{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public String rejectComment(@PathParam("id") String id) {
		CommentsDAO dao = (CommentsDAO)ctx.getAttribute("commentsDAO");
		System.out.println(id);
        return dao.rejectComment(id);
	}
}
