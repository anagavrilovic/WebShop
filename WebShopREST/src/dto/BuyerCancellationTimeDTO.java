package dto;

import java.util.Date;

public class BuyerCancellationTimeDTO {
	private String username;
	private Date cancellationTime;
	
	public BuyerCancellationTimeDTO() {}

	public BuyerCancellationTimeDTO(String username, Date cancellationTime) {
		super();
		this.username = username;
		this.cancellationTime = cancellationTime;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Date getCancellationTime() {
		return cancellationTime;
	}

	public void setCancellationTime(Date cancellationTime) {
		this.cancellationTime = cancellationTime;
	}
}
