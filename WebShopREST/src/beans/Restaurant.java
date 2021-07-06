package beans;

import java.util.*;

public class Restaurant {

    private String id;
    private String name;
    private String type;
    private String logoPath;
    private String imagePath;
    private Boolean isDeleted = false;
   
    private Location location;
    public WorkTime workTime;
   
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getLogoPath() {
		return logoPath;
	}
	public void setLogoPath(String logoPath) {
		this.logoPath = logoPath;
	}
	public String getImagePath() {
		return imagePath;
	}
	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}
	public Boolean getIsDeleted() {
		return isDeleted;
	}
	public void setIsDeleted(Boolean isDeleted) {
		this.isDeleted = isDeleted;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public WorkTime getWorkTime() {
		return workTime;
	}
	public void setWorkTime(WorkTime workTime) {
		this.workTime = workTime;
	}
	public Restaurant(String name, String type, String logoPath) {
		super();
		this.name = name;
		this.type = type;
		this.logoPath = logoPath;
	}
	public Restaurant(String name, String type, String logoPath, String imagePath, Location location,
			WorkTime workTime) {
		super();
		this.name = name;
		this.type = type;
		this.logoPath = logoPath;
		this.imagePath = imagePath;
		this.location = location;
		this.workTime = workTime;
		
		this.isDeleted = false;
		this.id = UUID.randomUUID().toString();
	}
	
	
	public Restaurant() {
		
	}
	
}