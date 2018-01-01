import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Venue, VenueReportSubmission } from '../../model/venue'

@Component({
  selector: 'fc-venue-listing',
  templateUrl: './venue-listing.component.html',
  styleUrls: ['./venue-listing.component.scss']
})
export class VenueListingComponent implements OnInit {

  @Input() venue;
  @Input("allow-report") allowReport = false;
  report: VenueReportSubmission;

  constructor(private http: HttpClient, private modalService: NgbModal) {
    this.report = new VenueReportSubmission();
  }

  ngOnInit() {
  }

  openModal(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.report = new VenueReportSubmission();
    }, (reason) => {
      this.closeResult = `Dismissed with: ${reason}`;
      this.report = new VenueReportSubmission();
    });
    return false;
  }

  submitReport(): void {
    this.report.id = this.venue.id;
    console.log(this.report);
    this.http.post('https://dev.findcheeseheads.com/api/venue/' + this.venue.id + '/report',
                   this.report).subscribe(data => {
      console.log(data);
    });
  }

}
