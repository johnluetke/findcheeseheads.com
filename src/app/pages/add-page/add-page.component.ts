import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Coordinates, Venue } from '../../model/venue';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'fc-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss']
})
export class AddPageComponent implements OnInit {

  isGeocoding: boolean;
  isSubmitting: boolean;
  mapLat: number;
  mapLng: number;
  mapZoom: number;
  message: string;
  success: boolean;
  venue: Venue;

  constructor(private http: HttpClient) {
    this.isSubmitting = false;
    this.isGeocoding = false;
    this.mapLat = 41.030;
    this.mapLng = -30.058;
    this.mapZoom = 2;
    this.message = "";
    this.success = null;
    this.venue = new Venue();
  }

  ngOnInit() {
  }

  formattedAddress(event) {
    this.venue.address = event;
    this.isGeocoding = false;

  }

  formattedLatitude(event) {
    this.venue.lat = event;
    this.isGeocoding = false;
    this.mapView();
  }

  formattedLongitude(event) {
    this.venue.lng = event;
    this.isGeocoding = false;
    this.mapView();
  }

  startGeocoding(): void {
    if (this.venue.address != null) {
      this.isGeocoding = true;
    }
  }

  submitVenue($event): void {
    this.isSubmitting = true;
    if (this.venue.name && this.venue.address) {
      this.venue.location = new Coordinates(
        this.venue.lat,
        this.venue.lng);

      this.http.post<any>(environment.apiUrl + '/venue/add', this.venue).subscribe(data => {
        this.success = true;
        this.message = data.message;
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
    if (this.venue.lat && this.venue.lng) {
      this.mapZoom = 10;
      this.mapLat = this.venue.lat;
      this.mapLng = this.venue.lng;
    }
  }

}