package com.findcheeseheads.backend.integration;

import com.findcheeseheads.backend.model.Location;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GeocodeClient {

    public static final int EARTH_RADIUS_MI = 3959;
    public static final int EARTH_RADIUS_KM = 6371;

    @Value("${service.geocode.url}")
    private String url;

    @Value("${service.geocode.api-key}")
    private String key;

    public Location geocode(String criteria) {
        try {
            HttpResponse<JsonNode> json = Unirest.get(url)
                .routeParam("criteria", criteria)
                .routeParam("api-key", key)
                .asJson();

            if ("OK".equals(json.getBody().getObject().getString("status"))) {
                JSONArray results = json.getBody().getObject().getJSONArray("results");
                if (results.length() == 1) {
                    JSONObject geometry = results.getJSONObject(0).getJSONObject("geometry");

                    if (geometry.has("location")) {
                        return new Location(
                            geometry.getJSONObject("location").getDouble("lat"),
                            geometry.getJSONObject("location").getDouble("lng"));
                    }
                    else {
                        return null;
                    }

                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        catch (UnirestException e) {
            return null;
        }
    }
}
