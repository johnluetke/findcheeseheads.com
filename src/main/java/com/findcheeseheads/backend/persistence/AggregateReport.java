package com.findcheeseheads.backend.persistence;

public class AggregateReport extends BaseEntity<com.findcheeseheads.backend.model.Report> {
    private Integer count;
    private String reason;

    public AggregateReport(long count, String reason) {
        this.count = Long.valueOf(count).intValue();
        this.reason = reason;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public com.findcheeseheads.backend.model.Report toModel() {
        com.findcheeseheads.backend.model.Report report = new com.findcheeseheads.backend.model.Report();

        report.count = this.count;
        report.reason = this.reason;

        return report;
    }

    public AggregateReport fromModel(com.findcheeseheads.backend.model.Report report) {
        throw new IllegalArgumentException();
    }
}