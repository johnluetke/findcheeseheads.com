package com.findcheeseheads.backend.persistence;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VenueRepository extends CrudRepository<Venue, Integer> {

    List<Venue> findAllByNameContaining(String name);

    List<Venue> findAllByOrderByNameAsc();

    List<Venue> findByAddressContaining(String part);

    @Query(value = "SELECT id, name, address, lat, lng, (?4 * acos(cos(radians(?1)) * cos(radians(lat)) * cos(radians(lng) - radians(?2)) + sin(radians(?1)) * sin(radians(lat)))) AS distance FROM Place WHERE pending = 0 HAVING distance < ?3 ORDER BY distance", nativeQuery = true)
    List<Venue> findAllNearCoordsWithin(double lat, double lng, double distance, int radius);
}
