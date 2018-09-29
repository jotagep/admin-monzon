import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SubirArchivoService {

  constructor(
    private http: HttpClient
  ) { }

  subirArchivo (archivo: File, tipo: string, id: string) {

    const url = `http://localhost:3000/upload/${tipo}/${id}`;
    const formData = new FormData();

    formData.append('imagen', archivo);

    return this.http.put(url, formData);
  }
}
