import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class UiService {

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  shouldShowHeader(): boolean {
    return this.router.url != "/";
  }

  shouldShowFooter(): boolean {
    return this.router.url != "/";
  }
}
