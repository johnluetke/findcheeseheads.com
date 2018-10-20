import { Component, Input, OnInit } from '@angular/core';
import { ReportMessage } from '../../../model/report';
import { Venue } from '../../../model/venue';
import { ReportService } from '../report.service';

@Component({
  selector: 'fc-report-message',
  templateUrl: './report-message.component.html',
  styleUrls: ['./report-message.component.scss']
})
export class ReportMessageComponent implements OnInit {

  @Input() public venue: Venue;
  private _message: ReportMessage;

  public get message(): ReportMessage {
    return this._message;
  }

  public constructor(private venueReportService: ReportService) { }

  public ngOnInit() {
    this.venueReportService.reportMessage$.subscribe(message => {
      if (message && message.venueId === this.venue.id) {
        this._message = message;
      }
    });
  }

}
