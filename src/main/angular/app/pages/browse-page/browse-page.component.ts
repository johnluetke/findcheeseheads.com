import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Venue } from '../../model/venue';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'fc-browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.scss']
})
export class BrowsePageComponent implements OnInit {

  venues: Venue[];

  constructor(private http: HttpClient) {
    this.venues = [];
  }

  ngOnInit() {
    this.fetchVenues();
  }

  fetchVenues(): void {
    this.http.get<any>(environment.apiUrl + '/venue/').subscribe(data => {
      this.venues = Venue.createFromArray(data);
    });
  }
}
