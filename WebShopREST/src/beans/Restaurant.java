package beans;

public class Restaurant {
	private String imagePath;
	private String name;
	private boolean isOpen;
	private String type;
	private int mark;
	
	
	
	public Restaurant(String imagePath, String name, boolean isOpen, String type, int mark) {
		super();
		this.imagePath = imagePath;
		this.name = name;
		this.isOpen = isOpen;
		this.type = type;
		this.mark = mark;
	}



	public String getImagePath() {
		return imagePath;
	}



	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}



	public boolean isOpen() {
		return isOpen;
	}



	public void setOpen(boolean isOpen) {
		this.isOpen = isOpen;
	}



	public String getType() {
		return type;
	}



	public void setType(String type) {
		this.type = type;
	}



	public int getMark() {
		return mark;
	}



	public void setMark(int mark) {
		this.mark = mark;
	}



	public Restaurant() {
		
	}
}
