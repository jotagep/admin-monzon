import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Usuario } from '../../models/usuario.model';
import { URL_API } from './../../config/config';
import { map } from 'rxjs/operators';

import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

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

  guardarStorage (id: string, token: string, usuario: Usuario) {
    this.usuario = usuario;
    this.token = token;

    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
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
          this.guardarStorage(resp.id, resp.token, resp.usuario);
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
            this.guardarStorage(resp.usuario._id, this.token, resp.usuario);
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
          this.guardarStorage(resp.usuario._id, this.token, this.usuario);
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
