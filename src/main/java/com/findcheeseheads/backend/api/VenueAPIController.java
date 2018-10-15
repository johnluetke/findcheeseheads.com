package com.findcheeseheads.backend.api;

import com.findcheeseheads.backend.integration.ZippopotamusClient;
import com.findcheeseheads.backend.model.Message;
import com.findcheeseheads.backend.model.Venue;
import com.findcheeseheads.backend.model.Report;
import com.findcheeseheads.backend.model.VenueSearchResults;
import com.findcheeseheads.backend.persistence.ReportRepository;
import com.findcheeseheads.backend.persistence.VenueRepository;
import com.findcheeseheads.backend.validation.VenueValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/venue")
public class VenueAPIController {

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private ZippopotamusClient zippopotamusClient;

    @Autowired
    private VenueValidator venueValidator;

    @GetMapping()
    public ResponseEntity<List<Venue>> getVenues() {
        Iterable<com.findcheeseheads.backend.persistence.Venue> pVenues = venueRepository.findAllByOrderByNameAsc();
        List<Venue> venues = new ArrayList<>();

        pVenues.forEach(pVenue -> {
            venues.add(pVenue.toModel());
        });

        return ResponseEntity.ok(venues);
    }

    @PostMapping()
    public ResponseEntity<Message> addVenue(@RequestBody Venue venue) throws URISyntaxException {
        com.findcheeseheads.backend.persistence.Venue pVenue = new com.findcheeseheads.backend.persistence.Venue();
        pVenue = venueRepository.save(pVenue.fromModel(venue));

        if (pVenue.getId() != null) {
            return ResponseEntity.created(new URI("/api/venue/" + pVenue.getId())).body(new Message(
                "Your submission was received, but must be approved by our staff before being listed. This could take up to two days."
            ));
        }
        else {
            return ResponseEntity.badRequest().body(new Message(
                "There was an error processing your submission. Please try again later."
            ));
        }
    }

    @GetMapping("/search/{country}/{criteria}")
    public ResponseEntity<VenueSearchResults> searchVenues(@PathVariable("country") String country, @PathVariable("criteria") String criteria) {
        List<Venue> results = new ArrayList<>();
        ZippopotamusClient.Nearby nearbyResults = zippopotamusClient.nearby(country, criteria);

        nearbyResults.cities.forEach(city -> {
            venueRepository.findByAddressContaining(city).forEach(venue -> {
                results.add(venue.toModel());
            });
        });

        nearbyResults.zips.forEach(zip -> {
            venueRepository.findByAddressContaining(zip).forEach(venue -> {
                results.add(venue.toModel());
            });
        });

        venueRepository.findByAddressContaining(criteria).forEach(venue -> {
            results.add(venue.toModel());
        });

        venueRepository.findAllByNameContaining(criteria).forEach(venue -> {
            results.add(venue.toModel());
        });

        return ResponseEntity.ok(new VenueSearchResults(criteria, country, nearbyResults.cities, results));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenue(@PathVariable("id") Integer venueId) {
        Optional<com.findcheeseheads.backend.persistence.Venue> pVenue = venueRepository.findById(venueId);
        if (pVenue.isPresent()) {
            return ResponseEntity.ok(pVenue.get().toModel());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<Venue> getVenue(@RequestParam("id") String venueId, @RequestBody Venue venue) {
        return ResponseEntity.ok(null);
    }

    @GetMapping("/{id}/report")
    public ResponseEntity<List<Report>> getVenueReports(@PathVariable("id") Integer venueId) {
        List<com.findcheeseheads.backend.persistence.AggregateReport> pReports = reportRepository.aggregateByPlaceId(venueId);
        List<Report> reports = new ArrayList<>();

        pReports.forEach(pReport -> reports.add(pReport.toModel()));

        return ResponseEntity.ok(reports);
    }

    @PostMapping("/{id}/report")
    public ResponseEntity<Message> reportVenue(@PathVariable("id") Integer venueId, @RequestBody Report report) {
        if (report.venueId != venueId) {
            return ResponseEntity.badRequest().build();
        }
        else if (null == report.reason || "".equals(report.reason)) {
            return ResponseEntity.badRequest().build();
        } else {
            reportRepository.save(new com.findcheeseheads.backend.persistence.Report().fromModel(report));
            return ResponseEntity.ok(new Message("Your report has been submitted."));
        }
    }
}
