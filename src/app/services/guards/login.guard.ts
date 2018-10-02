import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private _userService: UsuarioService, private router: Router) {

  }

  canActivate() {
    if (this._userService.estaLogueado()) {
      return true;
    } else {
      console.log('BLOQUEADO POR EL GUARD 🚫');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
