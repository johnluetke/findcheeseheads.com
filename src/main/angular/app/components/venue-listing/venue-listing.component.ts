import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Venue, VenueReportSubmission } from '../../model/venue'
import { environment } from '../../../environments/environment';

@Component({
  selector: 'fc-venue-listing',
  templateUrl: './venue-listing.component.html',
  styleUrls: ['./venue-listing.component.scss']
})
export class VenueListingComponent implements OnInit {

  @Input() venue;
  @Input("allow-report") allowReport = false;

  reportReasons: any[];
  reportModalCloseResult: string;
  report: VenueReportSubmission;
  reportMessage: string;

  constructor(private http: HttpClient, private modalService: NgbModal) {
    this.report = new VenueReportSubmission();
  }

  ngOnInit() {
  }

  openModal(content) {
    this.modalService.open(content).result.then(report => {
      this.http.post<any>(`${environment.apiUrl}/venue/${this.venue.id}/report`, report).subscribe(result => {
        this.reportMessage = result.message;
      })
    });
    return false;
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
