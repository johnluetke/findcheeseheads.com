import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { Venue } from '../../../model/venue';
import { ReportIndicatorComponent } from './report-indicator.component';

describe('ReportIndicatorComponent', () => {
  let component: ReportIndicatorComponent;
  let fixture: ComponentFixture<ReportIndicatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, NgbTooltipModule ],
      declarations: [ ReportIndicatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIndicatorComponent);
    component = fixture.componentInstance;
    component.venue = Venue.create({id: 0});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
