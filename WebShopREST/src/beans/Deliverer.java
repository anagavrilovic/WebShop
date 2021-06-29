package beans;

import java.util.*;

public class Deliverer extends User {

    private Boolean isDeleted = false;
    private Boolean isBlocked = false;
    
	public Deliverer() {
		super();
	}
	
	public Deliverer(Boolean isDeleted, Boolean isBlocked) {
		super();
		this.isDeleted = isDeleted;
		this.isBlocked = isBlocked;
	}

	public Boolean getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}

	public Boolean getIsBlocked() {
		return isBlocked;
	}

	public void setIsBlocked(Boolean isBlocked) {
		this.isBlocked = isBlocked;
	}
}