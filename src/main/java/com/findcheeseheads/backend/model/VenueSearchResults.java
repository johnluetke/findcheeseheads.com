package com.findcheeseheads.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        this.search = new HashMap<String, Object>();
    }

    @JsonProperty
    public String criteria;

    @JsonProperty
    public String country;

    @JsonProperty
    public List<String> cities;

    @JsonProperty
    public Map<String, Object> search;

    @JsonProperty
    public List<Venue> results;
}
