import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import 'rxjs/add/operator/map';

import { environment } from '../../../environments/environment';

import { Report } from '../../model/venue';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private reports: Report[] = [];
  private reportTypes: any[] = [
    {type: 'closed', name: 'Permanently closed'},
    {type: 'not_packer_bar', name: 'Not Cheesehead friendly'},
    {type: 'other', name: '(other)'},
  ];

  private reportsSubject = new BehaviorSubject<Report[]>(this.reports);
  private reportTypesSubject = new BehaviorSubject<any>(this.reportTypes);

  public constructor(private http: HttpClient) { }

  // TODO: Is this useful?
  public get reports$(): BehaviorSubject<Report[]> {
    return this.reportsSubject;
  }

  public get reportTypes$(): BehaviorSubject<any> {
    return this.reportTypesSubject;
  }

  public getReports$(venueId: number): Observable<Report[]> {
    return this.http.get<Report[]>(`${environment.apiUrl}/venue/${venueId}/report`).map(reports => {
      this.reports = reports;
      this.reportsSubject.next(reports);
      return reports;
    });
  }

  public sendReport(venueId: number, report: any): Observable<string> {
    return this.http.post<any>(`${environment.apiUrl}/venue/${venueId}/report`, report).map(
      result => result
    );
  }
}
