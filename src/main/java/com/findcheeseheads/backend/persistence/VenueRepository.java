package com.findcheeseheads.backend.persistence;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface VenueRepository extends CrudRepository<Venue, Integer> {

    List<Venue> findAllByNameContaining(String name);

    List<Venue> findAllByOrderByNameAsc();

    List<Venue> findByAddressContaining(String part);
}
