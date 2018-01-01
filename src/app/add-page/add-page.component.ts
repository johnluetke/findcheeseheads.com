import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Venue } from '../model';

@Component({
  selector: 'fc-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  data: Model;
  isGeocoding: boolean;
  isSubmitting: boolean;

  constructor(private http: HttpClient) {
    this.data = new Model();
    this.isSubmitting = false;
    this.isGeocoding = false;
  }

  ngOnInit() {
  }

  formattedAddress(event) {
    this.data.venue.address = event;
    this.isGeocoding = false;

  }

  formattedLatitude(event) {
    this.data.venue.lat = event;
    this.isGeocoding = false;
    this.mapView();
  }

  formattedLongitude(event) {
    this.data.venue.lng = event;
    this.isGeocoding = false;
    this.mapView();
  }

  startGeocoding(): void {
    if (this.data.venue.address != null) {
      this.isGeocoding = true;
    }
  }

  submitVenue($event): void {
    this.isSubmitting = true;
    if (this.data.venue.name && this.data.venue.address) {
      this.data.venue.location = {};
      this.data.venue.location.lat = this.data.venue.lat;
      this.data.venue.location.lng = this.data.venue.lng;
      this.http.post('https://dev.findcheeseheads.com/api/venue/add', this.data.venue).subscribe(data => {
        this.success = true;
        this.data.message = data.message;
      },
      error => {
        this.success = false;
      },
      () => {
        this.isSubmitting = false;
      });
    }
    else {
      this.isSubmitting = false;
    }
  }

  private mapView(): void {
    if (this.data.venue.lat && this.data.venue.lng) {
      this.data.mapZoom = 10;
      this.data.mapLat = this.data.venue.lat;
      this.data.mapLng = this.data.venue.lng;
    }
  }

}

class Model {

  mapLat: number;
  mapLng: number;
  mapZoom: number;
  message: string;
  success: boolean;
  venue: Venue;

  constructor() {
    this.mapLat = 41.030;
    this.mapLng = -30.058;
    this.mapZoom = 2;
    this.message = "";
    this.venue = new Venue();
  }
}
