package beans;

import java.util.*;

public class Credentials {
   
   private String username;
   private String password;
   private Role role;
   private Boolean isDeleted = false;
   
   public Credentials() {}
   
	public Credentials(String username, String password, Role role, Boolean isDeleted) {
		super();
		this.username = username;
		this.password = password;
		this.role = role;
		this.isDeleted = isDeleted;
	}

	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Role getRole() {
		return role;
	}
	
	public void setRole(Role role) {
		this.role = role;
	}
	
	public Boolean getIsDeleted() {
		return isDeleted;
	}
	
	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
}