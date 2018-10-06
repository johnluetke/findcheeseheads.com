package com.findcheeseheads.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class Country {

    public Country() {
        this(null, null);
    }

    public Country(String countryCode) {
        this(countryCode, null);
    }

    public Country(String countryCode, String name) {
        this.code = countryCode;
        this.name = name;
    }

    @JsonProperty
    public String code;

    @JsonProperty
    public String name;
}
