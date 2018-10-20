import { Component, Input, OnInit } from '@angular/core';
import { Report } from '../../../model/report';
import { Venue } from '../../../model/venue';
import { ReportService } from '../report.service';

@Component({
  selector: 'fc-report-indicator',
  templateUrl: './report-indicator.component.html',
  styleUrls: ['./report-indicator.component.scss']
})
export class ReportIndicatorComponent implements OnInit {

  @Input() private venue: Venue;
  private reports: Report[] = [];
  private reportTypes: Map<string,String> = new Map();

  public constructor(private reportVenueService: ReportService) { }

  public ngOnInit() {
    this.reportVenueService.getReports$(this.venue.id).subscribe(reports => {
      this.reports = reports;
    });

    this.reportVenueService.reportTypes$.subscribe(reportTypes => {
      reportTypes.forEach(reportType => {
        this.reportTypes.set(reportType.type, reportType.name);
      });
    });
  }

  public reportType(key: string) {
    if (this.reportTypes.has(key)) {
      return this.reportTypes.get(key);
    } else {
      return key;
    }
  }
}
