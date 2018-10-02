import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-not-page-found',
  templateUrl: './not-page-found.component.html',
  styles: []
})
export class NotPageFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
