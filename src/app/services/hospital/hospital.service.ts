import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { URL_API } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';
import { map } from 'rxjs/operators';

@Injectable()
export class HospitalService {

  constructor(
    private http: HttpClient,
    private _userService: UsuarioService
  ) { }

  getHospitals(pagina?: number) {
    let url = `${URL_API}/hospital`;
    if (pagina >= 0) {
      const desde = pagina * 5;
      url += `?desde=${desde}`;
    }

    return this.http.get(url);
  }

  getHospital(id: string) {
    const url = `${URL_API}/hospital/${id}`;

    return this.http.get(url)
      .pipe(
        map( (resp: any) => resp.hospital)
      );
  }

  newHospital(name: string) {
    const url = `${URL_API}/hospital?token=${this._userService.token}`;
    const hospital = new Hospital(name, this._userService.usuario);

    return this.http.post(url, hospital);
  }

  searchHospitals(busqueda: string) {
    const url = `${URL_API}/busqueda/coleccion/hospitales/${busqueda}`;

    return this.http.get(url)
      .pipe(
        map( (resp: any) => resp.hospitales)
      );
  }

  updateHospital( hospital: Hospital) {
    const url = `${URL_API}/hospital/${hospital._id}?token=${this._userService.token}`;

    return this.http.put(url, hospital);
  }

  deleteHospital(id: string) {
    const url = `${URL_API}/hospital/${id}?token=${this._userService.token}`;

    return this.http.delete(url);
  }

}
