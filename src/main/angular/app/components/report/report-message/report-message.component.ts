import { Component, OnInit, Input } from '@angular/core';
import { ReportService } from '../report.service';
import { Venue, ReportMessage } from '../../../model/venue';

@Component({
  selector: 'fc-report-message',
  templateUrl: './report-message.component.html',
  styleUrls: ['./report-message.component.scss']
})
export class ReportMessageComponent implements OnInit {

  @Input() venue: Venue;
  private _message: ReportMessage;

  get message(): ReportMessage {
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
