import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { PrettyList } from '../pretty-list.pipe'
import { SearchCriteria, SearchResults, VenueReportSubmission, Venue, Report } from '../model';

@Component({
  selector: 'fc-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  data: Model;

  private routeSubscription: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.data = new Model();
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.data.search.query = params['query'];
      this.data.search.country.code = params['country'];

      // if no country provided, detect it
      if (this.data.search.country.code == undefined) {
        this.http.get('http://dev.findcheeseheads.com/api/country').subscribe(data => {
          this.data.search.country = data.country;
        });
      }

      if (this.data.search.hasCriteria()) {
        this.performSearch();
      }
    });

    this.http.get('http://dev.findcheeseheads.com/api/countries').subscribe(data => {
      this.data.countries = data.countries;
    });
  }

  search(): void {
    this.router.navigate(['search', this.data.search.country.code, this.data.search.query])
  }

  performSearch() : void {
    let self = this;
    this.isSearching = true;
    this.data.results = new SearchResults();
    this.http.get('http://dev.findcheeseheads.com/api/venue/search/' + this.data.search.country.code + '/' + this.data.search.query).subscribe(data => {
      self.isSearching = false;
      self.data.results.query = self.data.search.query;
      self.data.results.country = self.data.search.country;
      self.data.results.cities = data.cities;
      self.data.results.venues = Venue.createFromArray(data.results);

      self.data.results.venues.forEach(function(venue: Venue) {
        self.http.get<Report>('http://dev.findcheeseheads.com/api/venue/' + venue.id + '/report').subscribe(reports => {
          let rpts: Report[] = [];
          for (let report in reports.reports) {
            let rpt = new Report();
            rpt.type = report;
            rpt.count = reports.reports[report];
            rpts.push(rpt);
          }
          venue.reports = rpts;
        });
      });
    });
  }

  reportVenue($event: any, venueId: number): void {
    $event.preventDefault();
    if (venueId == this.data.report.id) {
      this.data.report.id = null
    }
    else {
      this.data.report.id = venueId;
    }
  }

  sendVenueReport(): void {
    debugger;
  }
}

export interface Model {
  isSearching: boolean;

  countries: Country[];

  search: SearchCriteria;
  report: VenueReportSubmission;
  results: SearchResults;
}

export class Model implements IModel {
  constructor() {
    this.isSearching = false;

    this.countries = [];

    this.search = new SearchCriteria();
    this.report = new VenueReportSubmission();
    this.results = new SearchResults();
  }
}
