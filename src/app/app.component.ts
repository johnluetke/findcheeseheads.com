import { Component, OnInit } from '@angular/core';
import { UiService } from './ui.service';

@Component({
  selector: 'fc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private uiSvc: UiService) {
  }

  ngOnInit() {
  }

  appBranch() : string {
    return "MASTAH"
  }

  appRevision() : string {
    return "DEV";
  }

  copyrightYear() : string {
    return (new Date()).getYear() + 1900;
  }

  showHeader(): boolean {
    return this.uiSvc.shouldShowHeader();
  }

  showFooter(): boolean {
    return this.uiSvc.shouldShowFooter();
  }
}
