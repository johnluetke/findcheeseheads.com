import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  cities: string[] = [];
  countries: Country[] = [];
  venues: Venue[] = [];

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.data = new Model();
    this.isSearching = false;
    this.errorMessage = "";

    this.searchForm = this.formBuilder.group({
        criteria: [null, [Validators.required], []],
        distance: [25, [Validators.required], []],
        units: ['mi']
    });
  }

  ngOnInit() {
    this.routeSubscription = this.route.queryParams.subscribe(params => {
      this.searchForm.patchValue({
        criteria: params['criteria'],
        distance: params['distance'] || 25,
        units: params['units'] || 'mi'
      });

      this.data.search.criteria = params['criteria'];
      this.data.search.distance = params['distance'];
      this.data.search.units = params['units'];

      if (this.searchForm.valid) {
        this.performSearch();
      }
    });
  }

  search(): void {
    this.router.navigate(['search'], {
      queryParams: {
        criteria: this.searchForm.value.criteria,
        distance: this.searchForm.value.distance,
        units: this.searchForm.value.units
      }
    });
  }

  performSearch() : void {
    let self = this;
    this.isSearching = true;
    this.venues = [];
    this.http.get<any>(`${environment.apiUrl}/venue/search` + 
                       `?criteria=${this.searchForm.value.criteria}` + 
                       `&distance=${this.searchForm.value.distance}` +
                       `&units=${this.searchForm.value.units}`).subscribe(data => {
      if (data.cities == null) {
        data.cities = [];
      }

      self.data.results.criteria = self.data.search.criteria;
      self.data.results.distance = self.data.search.distance;
      self.data.results.units = self.data.search.units;
      self.cities = data.cities;
      self.venues = Venue.createFromArray(data.results);

      self.venues.forEach(function(venue: Venue) {
        self.http.get<any>(`${environment.apiUrl}/venue/${venue.id}/report`).subscribe(reports => {
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
      self.errorMessage = "An error occurred retrieving search results. Please try again later.";
      self.venues = [];
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
  search: SearchCriteria;
  report: VenueReportSubmission;
  results: SearchResults;

  constructor() {
    this.search = new SearchCriteria();
    this.report = new VenueReportSubmission();
    this.results = new SearchResults();
  }
}
