package com.findcheeseheads.backend.integration;

import com.findcheeseheads.backend.model.Country;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ZippopotamusClient {

    public Nearby nearby(String countryCode, String zip) {
        Nearby results = new Nearby();
        try {
            Integer.parseInt(zip);

            HttpResponse<JsonNode> json = Unirest.get("http://api.zippopotam.us/nearby/{countryCode}/{zip}")
                .routeParam("countryCode", countryCode)
                .routeParam("zip", zip)
                .asJson();

            json.getBody().getObject().getJSONArray("nearby").forEach(nearby -> {
                String city = ((JSONObject) nearby).getString("place name");

                if (!results.cities.contains(city)) {
                    results.cities.add(city);
                }

                results.zips.add(((JSONObject) nearby).getString("post code"));
            });
        }
        catch (UnirestException | JSONException e) {
            e.printStackTrace();
        }
        catch (NumberFormatException e) {

        }
        finally {
            return results;
        }
    }

    public class Nearby {

        public Nearby() {
            this.cities = new ArrayList<String>();
            this.zips = new ArrayList<String>();
        }

        public List<String> cities;
        public List<String> zips;
    }
}
