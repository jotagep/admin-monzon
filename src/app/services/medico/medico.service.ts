import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { UsuarioService } from '../usuario/usuario.service';
import { URL_API } from '../../config/config';

import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  constructor(
    private http: HttpClient,
    private _userService: UsuarioService
  ) { }

  getMedicos(pagina?: number) {
    let url = `${URL_API}/medico`;
    if (pagina >= 0) {
      const desde = pagina * 5;
      url += `?desde=${desde}`;
    }

    return this.http.get(url);
  }

  getMedico (id: string) {
    const url = `${URL_API}/medico/${id}`;

    return this.http.get(url)
      .pipe(
        map( (resp: any) => resp.medico)
      );
  }

  newMedico(medico) {
    const url = `${URL_API}/medico?token=${this._userService.token}`;
    return this.http.post(url, medico)
      .pipe(
        map((resp: any) => resp.medico)
      );
  }

  updateMedico(medico, id) {
    const url = `${URL_API}/medico/${id}?token=${this._userService.token}`;
    return this.http.put(url, medico)
      .pipe(
        map((resp: any) => resp.medico)
      );
  }

  searchMedicos(busqueda: string) {
    const url = `${URL_API}/busqueda/coleccion/medicos/${busqueda}`;

    return this.http.get(url)
      .pipe(
        map( (resp: any) => resp.medicos)
      );
  }

  deleteMedico(id: string) {
    const url = `${URL_API}/medico/${id}?token=${this._userService.token}`;

    return this.http.delete(url);
  }
}
