package com.findcheeseheads.backend.persistence;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReportRepository extends CrudRepository<Report, Integer> {

    List<Report> findAllByPlaceId(Integer placeId);

    @Query(value = "SELECT new com.findcheeseheads.backend.persistence.AggregateReport(COUNT(*), reason) FROM Report WHERE place_id = ?1 GROUP BY reason")
    List<AggregateReport> aggregateByPlaceId(Integer placeId);
}
