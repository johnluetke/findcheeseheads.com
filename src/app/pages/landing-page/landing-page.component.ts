import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchCriteria } from '../../model/search'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'fc-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  model: SearchCriteria;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.model = <SearchCriteria>[];
    this.http.get(environment.apiUrl + '/country').subscribe(data => {
      this.model.country = data.country;
    });
  }

  doSearch(event: any) {
    event.preventDefault();
    this.router.navigate(['search', this.model.country.code, this.model.query])
  }
}
