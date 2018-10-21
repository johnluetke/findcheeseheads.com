package com.findcheeseheads.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class Venue {

    private Integer id;
    private String name;
    private String address;
    private Location location;
    private Double distance;

    @JsonProperty
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @JsonProperty
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @JsonProperty
    public Double getDistance() {
        return distance;
    }

    public void setDistance(Double distance) {
        this.distance = distance;
    }

    @JsonProperty
    public Location getLocation() {
        if (location == null) {
            location = new Location();
        }
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }
}
