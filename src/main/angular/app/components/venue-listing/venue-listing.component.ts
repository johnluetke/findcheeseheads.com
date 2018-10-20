import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ReportSubmission } from '../../model/report';
import { ReportService } from '../report/report.service';

@Component({
  selector: 'fc-venue-listing',
  templateUrl: './venue-listing.component.html',
  styleUrls: ['./venue-listing.component.scss']
})
export class VenueListingComponent implements OnInit {

  @Input() public venue;
  @Input("allow-report") public allowReport = false;

  public reportReasons: any[];
  public reportModalCloseResult: string;
  public report: ReportSubmission;
  public reportMessage: string;

  public constructor(private http: HttpClient, private reportVenueService: ReportService) {
    this.report = new ReportSubmission();
  }

  public ngOnInit() {
  }

}
