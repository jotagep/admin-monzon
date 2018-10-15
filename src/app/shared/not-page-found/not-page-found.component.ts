import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-not-page-found',
  templateUrl: './not-page-found.component.html',
  styleUrls: ['./not-page-found.component.css']
})
export class NotPageFoundComponent implements OnInit {

  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
