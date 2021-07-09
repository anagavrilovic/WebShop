package services;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Comment;
import dao.CommentsDAO;

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
	
	
}
