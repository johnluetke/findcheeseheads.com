package com.findcheeseheads.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class Location {

    public Location() {
        this(0, 0);
    }

    public Location(double lat, double lng) {
        this.lat = lat;
        this.lng = lng;
    }

    @JsonProperty
    public double lat;

    @JsonProperty
    public double lng;
}
