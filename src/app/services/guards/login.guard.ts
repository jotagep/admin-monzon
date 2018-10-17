import { Injectable } from '@angular/core';
import { CanActivate, Router, CanActivateChild} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuard implements CanActivateChild {

  constructor(
    private _userService: UsuarioService,
    private router: Router) {

  }

  canActivateChild() {
    if (this._userService.estaLogueado()) {
      return true;
    } else {
      console.log('BLOQUEADO POR EL GUARD 🚫');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
