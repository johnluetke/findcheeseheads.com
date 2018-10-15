package com.findcheeseheads.backend.integration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.findcheeseheads.backend.model.Country;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
public class LocationClient {

    List<Country> countries = null;

    @PostConstruct
    private void initialize() {
        try {
            InputStream stream = this.getClass().getClassLoader().getResourceAsStream("data/countries.json");
            Country[] countries = new ObjectMapper().readValue(stream, Country[].class);
            this.countries = Arrays.asList(countries);
        }
        catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Country> getCountries() {
        return this.countries;
    }

    public String getCountryCodeFromIP(String ip) {
        try {
            HttpResponse<JsonNode> json = Unirest.get("http://ipinfo.io/{ip}/json")
                .routeParam("ip", ip)
                .asJson();

            return json.getBody().getObject().getString("country");
        }
        catch (UnirestException e) {
            return null;
        }
    }
}
