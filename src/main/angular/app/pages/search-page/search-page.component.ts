import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Country, SearchCriteria, SearchResults } from '../../model/search';
import { Venue } from '../../model/venue';

@Component({
  selector: 'fc-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

  public data: Model;
  public isSearching: boolean;
  public errorMessage: string;

  public cities: string[] = [];
  public countries: Country[] = [];
  public venues: Venue[] = [];

  public searchForm: FormGroup;

  private routeSubscription: any;

  public constructor(private formBuilder: FormBuilder, private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.data = new Model();
    this.isSearching = false;
    this.errorMessage = "";

    this.searchForm = this.formBuilder.group({
        country: [null, [Validators.required], []],
        criteria: [null, [Validators.required], []]
    });
  }

  public ngOnInit() {
    this.routeSubscription = this.route.params.subscribe(params => {
      this.searchForm.patchValue({country: params['country']});
      this.searchForm.patchValue({criteria: params['query']});

      // if no country provided, detect it
      if (!this.searchForm.value.country) {
        this.http.get<any>(environment.apiUrl + '/country').subscribe(country => {
          this.searchForm.patchValue({country: country.code});
        });
      }

      if (this.searchForm.valid) {
        this.performSearch();
      }
    });

    this.http.get<any>(environment.apiUrl + '/countries').subscribe(countries => {
      this.countries = countries;
    });
  }

  public search(): void {
    this.router.navigate(['search', this.searchForm.value.country, this.searchForm.value.criteria]);
  }

  public performSearch() : void {
    const self = this;
    this.isSearching = true;
    this.venues = [];
    this.http.get<any>(`${environment.apiUrl}/venue/search/${this.searchForm.value.country}/${this.searchForm.value.criteria}`).subscribe(data => {
      if (data.cities == null) {
        data.cities = [];
      }

      self.data.results.query = self.data.search.query;
      self.data.results.country = self.data.search.country;
      self.cities = data.cities;
      self.venues = Venue.createFromArray(data.results);
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
}

export class Model {
  public search: SearchCriteria;
  public results: SearchResults;

  public constructor() {
    this.search = new SearchCriteria();
    this.results = new SearchResults();
  }
}
