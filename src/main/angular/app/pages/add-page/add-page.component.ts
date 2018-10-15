import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  addVenueForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.isSubmitting = false;
    this.isGeocoding = false;
    this.mapLat = 41.030;
    this.mapLng = -30.058;
    this.mapZoom = 2;
    this.message = "";
    this.success = null;
    this.venue = new Venue();

    this.addVenueForm = this.formBuilder.group({
        name: [null, [Validators.required, Validators.minLength(3)]],
        address: [],
        lat: [],
        lng: [],
    });
  }

  ngOnInit() {
  }

  formattedAddress(event) {
    this.isGeocoding = false;
    console.debug("Received formatted address component (next line)");
    console.debug(event);
    if (typeof event === "string") {
      console.debug("Interpreting as formatted address");
      this.addVenueForm.get('address').setValue(event);
    }
    else if (typeof event === "object") {
      console.debug("Interpreting as coordinates");
      this.addVenueForm.get('lat').setValue(event.lat);
      this.addVenueForm.get('lng').setValue(event.lng);
      this.mapView();
    }
    else {

    }
  }

  startGeocoding(): void {
    if (this.venue.address != null) {
      this.isGeocoding = true;
    }
  }

  submitVenue(): void {
    this.isSubmitting = true;
    if (this.addVenueForm.valid) {
      this.venue = this.addVenueForm.value;
      this.venue.location = new Coordinates(
        this.venue.lat,
        this.venue.lng);

      this.http.post<any>(environment.apiUrl + '/venue', this.venue).subscribe(data => {
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
