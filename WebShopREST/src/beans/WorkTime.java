package beans;

import java.util.*;

public class WorkTime {
   private Date workTimeStart;
   private Date workTimeEnd;
   
	public WorkTime() {
		super();
	}
	
	public WorkTime(Date workTimeStart, Date workTimeEnd) {
		super();
		this.workTimeStart = workTimeStart;
		this.workTimeEnd = workTimeEnd;
	}

	public Date getWorkTimeStart() {
		return workTimeStart;
	}

	public void setWorkTimeStart(Date workTimeStart) {
		this.workTimeStart = workTimeStart;
	}

	public Date getWorkTimeEnd() {
		return workTimeEnd;
	}

	public void setWorkTimeEnd(Date workTimeEnd) {
		this.workTimeEnd = workTimeEnd;
	}
   

}