import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { Venue, VenueReportSubmission } from '../../model/venue';
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
  public report: VenueReportSubmission;
  public reportMessage: string;

  public constructor(private http: HttpClient, private reportVenueService: ReportService) {
    this.report = new VenueReportSubmission();
  }

  public ngOnInit() {
  }
  
  public submitReport(): void {
    this.report.venueId = this.venue.id;
    console.log(this.report);
    /*this.http.post<any>(environment.apiUrl + '/venue/' + this.venue.id + '/report',
                   this.report).subscribe(data => {
      this.reportMessage = data.message;
    });*/
  }

}
