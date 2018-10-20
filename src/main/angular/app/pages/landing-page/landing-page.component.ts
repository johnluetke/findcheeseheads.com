import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchCriteria } from '../../model/search'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'fc-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.searchForm = this.formBuilder.group({
        country: [],
        criteria: []
    });

    this.http.get<any>(environment.apiUrl + '/country').subscribe(country => {
      this.searchForm.patchValue({country: country.code});
    });
  }

  copyrightYear() : number {
    return (new Date()).getFullYear();
  }

  doSearch() {
    this.router.navigate(['search', this.searchForm.value.country, this.searchForm.value.criteria])
  }
}
