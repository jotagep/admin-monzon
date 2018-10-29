import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';

import { Usuario } from './../../models/usuario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  user: Usuario;

  constructor(
    private _userService: UsuarioService
  ) { }

  ngOnInit() {
    this.user = this._userService.usuario;
  }

}
