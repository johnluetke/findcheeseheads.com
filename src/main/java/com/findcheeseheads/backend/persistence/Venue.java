package com.findcheeseheads.backend.persistence;

import com.findcheeseheads.backend.model.Location;

import javax.persistence.*;

@Entity
@Table(name = "venue")
public class Venue extends BaseEntity<com.findcheeseheads.backend.model.Venue> {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;
    private String name;
    private String address;
    private double lat;
    private double lng;
    @Transient
    private double distance;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLng() {
        return lng;
    }

    public void setLng(double lng) {
        this.lng = lng;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public com.findcheeseheads.backend.model.Venue toModel() {
        com.findcheeseheads.backend.model.Venue venue = new com.findcheeseheads.backend.model.Venue();

        venue.setId(this.id);
        venue.setName(this.name);
        venue.setAddress(this.address);
        venue.setDistance(this.distance);
        venue.setLocation(new Location(this.lat, this.lng));

        return venue;
    }

    public Venue fromModel(com.findcheeseheads.backend.model.Venue venue) {
        this.setId(venue.getId());
        this.setName(venue.getName());
        this.setAddress(venue.getAddress());
        this.setLat(venue.getLocation().lat);
        this.setLng(venue.getLocation().lng);

        return this;
    }
}
