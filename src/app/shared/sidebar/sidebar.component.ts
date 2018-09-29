import { Component, OnInit, OnDestroy } from '@angular/core';

import { SidebarService, UsuarioService } from '../../services/service.index';
import { Menu } from '../../models/menu.interface';
import { Usuario } from './../../models/usuario.model';

import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  menu: Menu[];
  subsMenu: Subscription;

  constructor(
    private _sidebar: SidebarService,
    private _userService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._userService.usuario;
    this.subsMenu = this._sidebar.getMenu().subscribe((menu: Menu[]) => {
      this.menu = menu;
    });
  }

  logout() {
    this._userService.logout();
  }

  ngOnDestroy(): void {
    this.subsMenu.unsubscribe();
  }

}
