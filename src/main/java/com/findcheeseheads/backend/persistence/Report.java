package com.findcheeseheads.backend.persistence;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "report")
public class Report extends BaseEntity<com.findcheeseheads.backend.model.Report> {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private Integer placeId;
    private String reason;
    private String other;
    private Instant timestamp;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPlaceId() {
        return placeId;
    }

    public void setPlaceId(Integer placeId) {
        this.placeId = placeId;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getOther() {
        return other;
    }

    public void setOther(String other) {
        this.other = other;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public com.findcheeseheads.backend.model.Report toModel() {
        com.findcheeseheads.backend.model.Report report = new com.findcheeseheads.backend.model.Report();

        return report;
    }

    public Report fromModel(com.findcheeseheads.backend.model.Report model) {
        //this.setId(model.);
        this.setPlaceId(model.venueId);
        this.setReason(model.reason);
        this.setOther(model.other == null ? "" : model.other);
        this.setTimestamp(null);

        return this;
    }
}
