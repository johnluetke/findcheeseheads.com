package com.findcheeseheads.backend.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class Reason {

    public static final Reason CLOSED = new Reason("closed", "Permanently closed");

    public static final Reason NOT_PACKER_BAR = new Reason("not_packer_bar", "Not Cheesehead friendly");

    public static final Reason OTHER = new Reason("other_reason", "(other reason)");

    public static Reason[] values() {
        return new Reason[] {
          CLOSED,
          NOT_PACKER_BAR,
          OTHER
        };
    }

    private String key;
    private String label;

    private Reason(String key, String label) {
        this.key = key;
        this.label = label;
    }

    @JsonProperty
    public String getKey() {
        return key;
    }

    @JsonProperty
    public String getLabel() {
        return label;
    }
}
