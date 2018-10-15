import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';

// SweetAlert
import swal from 'sweetalert2';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private _userService: UsuarioService,
    private router: Router
  ) { }

  canActivate() {
    if (this._userService.usuario.role === 'ADMIN_ROLE') {
      return true;
    } else {
      console.log(' ** Bloqueado por el ADMIN_GUARD **');
      swal('No puedes acceder', 'No tienes rol de administrador', 'warning');
      return false;
    }
  }
}
