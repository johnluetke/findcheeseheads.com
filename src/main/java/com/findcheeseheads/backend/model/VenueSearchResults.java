package com.findcheeseheads.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.ArrayList;
import java.util.List;

@JsonSerialize
public class VenueSearchResults {

    public VenueSearchResults() {
        this(null, null, new ArrayList<String>(), new ArrayList<Venue>());
    }

    public VenueSearchResults(String criteria, String country, List<String> cities, List<Venue> results) {
        this.criteria = criteria;
        this.country = country;
        this.cities = cities;
        this.results = results;
    }

    @JsonProperty
    public String criteria;

    @JsonProperty
    public String country;

    @JsonProperty
    public List<String> cities;

    @JsonProperty
    public List<Venue> results;
}
