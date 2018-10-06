import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, SearchCriteria, SearchResults } from '../../model/search';
import { Report, VenueReportSubmission, Venue } from '../../model/venue';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'fc-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  data: Model;
  isSearching: boolean;
  errorMessage: string;

  private routeSubscription: any;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.data = new Model();
    this.isSearching = false;
    this.errorMessage = "";
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.data.search.query = params['query'];
      this.data.search.country.code = params['country'];

      // if no country provided, detect it
      if (this.data.search.country.code == undefined) {
        this.http.get<any>(environment.apiUrl + '/country').subscribe(country => {
          this.data.search.country = country;
        });
      }

      if (this.data.search.hasCriteria()) {
        this.performSearch();
      }
    });

    this.http.get<any>(environment.apiUrl + '/countries').subscribe(countries => {
      this.data.countries = countries;
    });
  }

  search(): void {
    this.router.navigate(['search', this.data.search.country.code, this.data.search.query])
  }

  performSearch() : void {
    let self = this;
    this.isSearching = true;
    this.data.results = new SearchResults();
    this.http.get<any>(environment.apiUrl + '/venue/search/' + this.data.search.country.code + '/' + this.data.search.query).subscribe(data => {
      if (data.cities == null) {
        data.cities = [];
      }

      self.data.results.query = self.data.search.query;
      self.data.results.country = self.data.search.country;
      self.data.results.cities = data.cities;
      self.data.results.venues = Venue.createFromArray(data.results);

      self.data.results.venues.forEach(function(venue: Venue) {
        self.http.get<any>(environment.apiUrl + '/venue/' + venue.id + '/report').subscribe(reports => {
          let rpts: Report[] = [];
          reports.forEach(report => {
            let rpt = new Report();
            rpt.type = report.reason;
            rpt.count = report.count;
            rpts.push(rpt);
          });
          venue.reports = rpts;
        },
        error => {
          console.error(error);
        });
      });
    },
    error => {
      self.isSearching = false;
      self.errorMessage = "An error occured retrieving search results. Please try again later.";
      self.data.results = new SearchResults();
    },
    () => {
      self.isSearching = false;
    });
  }

  reportVenue($event: any, venueId: number): void {
    $event.preventDefault();
    if (venueId == this.data.report.venueId) {
      this.data.report.venueId = null
    }
    else {
      this.data.report.venueId = venueId;
    }
  }

  sendVenueReport(): void {
    debugger;
  }
}

export class Model {
  countries: Country[];
  search: SearchCriteria;
  report: VenueReportSubmission;
  results: SearchResults;

  constructor() {
    this.countries = [];

    this.search = new SearchCriteria();
    this.report = new VenueReportSubmission();
    this.results = new SearchResults();
  }
}
