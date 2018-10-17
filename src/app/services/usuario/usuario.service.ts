
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Usuario } from '../../models/usuario.model';
import { URL_API } from './../../config/config';
import { map, catchError } from 'rxjs/operators';

import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';
import { Menu } from '../../models/menu.interface';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: Menu[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private _subirImg: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token ? true : false;
  }

  guardarStorage (id: string, token: string, usuario: Usuario, menu: Menu[]) {
    this.usuario = usuario;
    this.token = token;
    this.menu = menu;

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  cargarStorage () {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    }
  }

  crearUser(user: Usuario) {
    const url = `${URL_API}/usuario`;

    return this.http.post(url, user);
  }

  logout() {
    this.token = null;
    this.usuario = null;
    this.menu = [];

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }

  loginUser(email: string, password: string) {
    const url = `${URL_API}/login`;

    return this.http.post(url, { email, password })
    .pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return resp.usuario;
      })
    );
  }

  loginGoogle(token: string) {
    const url = `${URL_API}/login/google`;

    return this.http.post(url, { token })
      .pipe(
        map((resp: any) => {
          console.log(resp);
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          return true;
        })
      );
  }

  renewToken() {
    const url = `${URL_API}/login/newtoken?token=${this.token}`;

    return this.http.get(url)
      .pipe(
        map((resp: any) => {
          this.token = resp.token;
          localStorage.setItem('token', this.token);

          return true;
        })
      );
  }

  updateUser(user: Usuario) {
    const url = `${URL_API}/usuario/${user._id}?token=${this.token}`;

    return this.http.put(url, user)
      .pipe(
        map( (resp: any) => {
          if (this.usuario._id === resp.usuario._id) {
            this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
          }
          return true;
        })
      );
  }

  updateImg(file: File) {
    return this._subirImg.subirArchivo(file, 'usuarios', this.usuario._id)
      .pipe(
        map((resp: any) => {
          this.usuario.img = resp.usuario.img;
          this.guardarStorage(resp.usuario._id, this.token, this.usuario, this.menu);
          return true;
        })
      );
  }

  getUsers(pagina?: number) {
    let url = `${URL_API}/usuario`;
    if (pagina >= 0) {
      const desde = pagina * 5;
      url += `?desde=${desde}`;
    }

    return this.http.get(url);
  }

  searchUsers(busqueda: string) {
    const url = `${URL_API}/busqueda/coleccion/usuarios/${busqueda}`;

    return this.http.get(url)
      .pipe(
        map( (resp: any) => resp.usuarios)
      );
  }

  deleteUser(id: string) {
    const url = `${URL_API}/usuario/${id}?token=${this.token}`;

    return this.http.delete(url);
  }
}
