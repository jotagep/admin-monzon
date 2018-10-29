import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { URL_API } from './../../config/config';

@Injectable()
export class SubirArchivoService {

  constructor(
    private http: HttpClient
  ) { }

  subirArchivo (archivo: File, tipo: string, id: string) {

    const url = `${URL_API}/upload/${tipo}/${id}`;
    const formData = new FormData();

    formData.append('imagen', archivo);

    return this.http.put(url, formData);
  }
}
