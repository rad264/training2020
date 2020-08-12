package com.smbcgroup.training.jpa;

import java.math.BigDecimal;

public class DepartmentSummary {

	private BigDecimal min;
	private BigDecimal max;
	private BigDecimal avg;

	public DepartmentSummary(BigDecimal min, BigDecimal max, BigDecimal avg) {
		this.min = min;
		this.max = max;
		this.avg = avg;
	}

	public BigDecimal getMin() {
		return min;
	}

	public void setMin(BigDecimal min) {
		this.min = min;
	}

	public BigDecimal getMax() {
		return max;
	}

	public void setMax(BigDecimal max) {
		this.max = max;
	}

	public BigDecimal getAvg() {
		return avg;
	}

	public void setAvg(BigDecimal avg) {
		this.avg = avg;
	}

}
