import { Component, OnInit } from '@angular/core';

import { UsuarioService } from '../../services/service.index';
import { Menu } from '../../models/menu.interface';
import { Usuario } from './../../models/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;
  menu: Menu[];

  constructor(
    private _userService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._userService.usuario;
    this.menu = this._userService.menu;
  }

  logout() {
    this._userService.logout();
  }

}
