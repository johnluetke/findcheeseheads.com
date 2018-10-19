import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ReportService } from '../report.service';
import { Venue } from '../../../model/venue';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fc-report-actions',
  templateUrl: './report-actions.component.html',
  styleUrls: ['./report-actions.component.scss']
})
export class ReportActionsComponent implements OnInit {

  @Input() venue: Venue;
  modalRef: NgbModalRef;
  reportForm: FormGroup;

  public constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private reportVenueService: ReportService) { }

  public ngOnInit() {
    this.reportForm = this.formBuilder.group({
      venueId: [this.venue.id],
      reason: ['default', Validators.required],
      other: [null]
    });

    this.reportForm.valueChanges.subscribe(() => {
      if (this.reportForm.value.reason === 'other_reason') {
        this.reportForm.get('other').setValidators(Validators.required);
      } else {
        this.reportForm.get('other').clearValidators();
      }
    });
  }

  public openReportModal(content, $event?: any) {
    if ($event) {
      $event.preventDefault();
    }

    this.modalRef = this.modalService.open(content);

    this.modalRef.result.then(
      report => {
        this.reportVenueService.sendReport(this.venue.id, report).subscribe(() => {
          this.reportForm.reset();
        });
      },
      () => {}
    );
  }

  public validateForm() {
    if (this.reportForm.value.reason === 'default') {
      this.reportForm.patchValue({reason: null});
    }

    if (this.reportForm.valid) {
      this.modalRef.close(this.reportForm.value);
    }
  }
}
