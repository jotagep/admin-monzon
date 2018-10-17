import { Injectable, OnDestroy } from '@angular/core';
import { CanActivateChild, Router } from '@angular/router';

import { UsuarioService } from '../usuario/usuario.service';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class VerifyTokenGuard implements CanActivateChild, OnDestroy {

  subsToken: Subscription;

  constructor(
    private router: Router,
    private _userService: UsuarioService
  ) {

  }

  canActivateChild(): Promise<boolean> | boolean {
    const token = this._userService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expirado = this.expiracion(payload.exp);

    if (expirado) {
      console.log('-- Token expirado --');
      this.router.navigate(['/login']);
      return false;
    }

    return this.verificaRenew(payload.exp);
  }

  verificaRenew( fechaExp: number): Promise<boolean> {
    return new Promise((resolve, reject) => {

      const tokenExp = new Date(fechaExp * 1000);
      const horaAntes = new Date();

      horaAntes.setTime(horaAntes.getTime() + (1 * 60 * 60 * 1000));

      if (tokenExp.getTime() > horaAntes.getTime()) {
        resolve (true);
      } else {
        this.subsToken = this._userService.renewToken()
          .subscribe( () => {
            resolve(true);
          }, () => {
            console.log('BLOQUEADO POR EL GUARD 🚫');
            this.router.navigate(['/login']);
            reject(false);
          });
      }
    });
  }

  expiracion ( fechaExp: number) {
    const now = new Date().getTime() / 1000; // ms -> s

    return fechaExp < now ? true : false;
  }

  ngOnDestroy() {
    if (this.subsToken) {
      this.subsToken.unsubscribe();
    }
  }
}
