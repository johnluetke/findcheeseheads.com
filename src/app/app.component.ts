import { Component, OnInit } from '@angular/core';

import { UiService } from './services/ui.service';

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

  copyrightYear() : number {
    return (new Date()).getFullYear();
  }

  showHeader(): boolean {
    return this.uiSvc.shouldShowHeader();
  }

  showFooter(): boolean {
    return this.uiSvc.shouldShowFooter();
  }
}
