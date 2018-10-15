import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';

import { URL_API } from '../../config/config';

import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit, OnDestroy {

  subsRoute: Subscription;
  subsData: Subscription;

  termino: string;

  usuarios: Usuario[];
  medicos: Medico[];
  hospitales: Hospital[];

  constructor(
    private actRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.usuarios = [];
    this.medicos = [];
    this.hospitales = [];
  }

  ngOnInit() {
    this.subsRoute = this.actRoute.params.subscribe(params => {
      this.termino = params['termino'];
      this.buscar();
    });
  }

  buscar() {
    const url = `${URL_API}/busqueda/todo/${this.termino}`;

    this.subsData = this.http.get(url).subscribe((resp: any) => {
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }

  ngOnDestroy() {
    this.subsRoute.unsubscribe();
    if (this.subsData) {
      this.subsData.unsubscribe();
    }
  }

}
