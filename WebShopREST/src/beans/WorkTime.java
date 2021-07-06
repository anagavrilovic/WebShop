package beans;

import java.util.*;

public class WorkTime {
   private String workTimeStart;
   private String workTimeEnd;
   
	public WorkTime() {
		super();
	}
	
	public WorkTime(String workTimeStart, String workTimeEnd) {
		super();
		this.workTimeStart = workTimeStart;
		this.workTimeEnd = workTimeEnd;
	}

	public String getWorkTimeStart() {
		return workTimeStart;
	}

	public void setWorkTimeStart(String workTimeStart) {
		this.workTimeStart = workTimeStart;
	}

	public String getWorkTimeEnd() {
		return workTimeEnd;
	}

	public void setWorkTimeEnd(String workTimeEnd) {
		this.workTimeEnd = workTimeEnd;
	}
   

}