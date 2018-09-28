import { Component, OnInit } from '@angular/core';

import { SidebarService, UsuarioService } from '../../services/service.index';
import { Menu } from '../../models/menu.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menu: Menu[];

  constructor(
    private _sidebar: SidebarService,
    private _userService: UsuarioService
  ) { }

  ngOnInit() {
    this._sidebar.getMenu().subscribe((menu: Menu[]) => {
      this.menu = menu;
    });
  }

  logout() {
    this._userService.logout();
  }
}
