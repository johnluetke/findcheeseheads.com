import { Component, OnInit } from '@angular/core';

import { UiService } from './services/ui.service';
import { environment } from '../environments/environment';

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
    return environment.version.branch;
  }

  appRevision() : string {
    return environment.version.revision;
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
