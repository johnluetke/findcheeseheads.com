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

  search: SearchCriteria;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.search = new SearchCriteria();
    this.http.get<any>(environment.apiUrl + '/country').subscribe(country => {
      this.search.country = country;
    });
  }

  copyrightYear() : number {
    return (new Date()).getFullYear();
  }

  doSearch(event: any) {
    event.preventDefault();
    this.router.navigate(['search', this.search.country.code, this.search.query])
  }
}
