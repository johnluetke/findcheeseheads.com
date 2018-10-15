package com.findcheeseheads.backend.api;

import com.findcheeseheads.backend.model.Country;
import com.findcheeseheads.backend.integration.LocationClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RootAPIController {

    @Autowired
    LocationClient locationClient;

    @GetMapping("/countries")
    public ResponseEntity<List<Country>> getCountries() {
        List<Country> response = locationClient.getCountries();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/country")
    public ResponseEntity<Country> getCountryFromIP(@RequestHeader MultiValueMap<String,String> headers) {
        Country response =  new Country(locationClient.getCountryCodeFromIP(""));
        return ResponseEntity.ok(response);
    }
}
