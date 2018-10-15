package com.findcheeseheads.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class Report {

    @JsonProperty
    public Integer venueId;

    @JsonProperty
    public String reason;

    @JsonProperty
    public String other;

    @JsonProperty
    public int count;
}
