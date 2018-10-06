import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isCollapsed: boolean;

  constructor() { }

  ngOnInit() {
    this.isCollapsed = true;
  }
}
