import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Usuario } from '../../models/usuario.model';
import { URL_API } from './../../config/config';
import { map } from 'rxjs/operators';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient, private router: Router) {
    console.log('Servicio usuario listo');
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token ? true : false;
  }

  guardarStorage (id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;

    this.router.navigate(['/login']);
  }

  cargarStorage () {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }
  }

  crearUser(user: Usuario) {
    const url = `${URL_API}/usuario`;

    return this.http.post(url, user);
  }

  logout() {
    this.token = null;
    this.usuario = null;

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginUser(email: string, password: string) {
    const url = `${URL_API}/login`;

    return this.http.post(url, { email, password })
    .pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  loginGoogle(token: string) {
    const url = `${URL_API}/login/google`;

    return this.http.post(url, { token })
      .pipe(
        map((resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario);
          this.router.navigate(['/dashboard']);
          return true;
        })
      );
  }
}
