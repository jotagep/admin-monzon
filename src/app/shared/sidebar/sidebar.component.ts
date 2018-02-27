import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../services/service.index';
import { Menu } from '../../models/menu.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menu: Menu[];

  constructor(
    private _sidebar: SidebarService
  ) { }

  ngOnInit() {
    this._sidebar.getMenu().subscribe((menu: Menu[]) => {
      this.menu = menu;
    });
  }

}
