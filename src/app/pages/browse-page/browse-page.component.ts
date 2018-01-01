import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Venue } from '../../model/venue';

@Component({
  selector: 'fc-browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.scss']
})
export class BrowsePageComponent implements OnInit {

  data: Model;

  constructor(private http: HttpClient) {
    this.data = new Model();
  }

  ngOnInit() {
    this.fetchVenues();
  }

  fetchVenues(): void {
    this.http.get('http://dev.findcheeseheads.com/api/venue/').subscribe(data => {
      this.data.venues = Venue.createFromArray(data);
    });
  }
}

class Model {
  venues: Venue[];

  constructor() {
    this.venues = [];
  }
}
