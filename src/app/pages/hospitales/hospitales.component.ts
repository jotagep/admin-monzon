import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import {
  HospitalService,
  ModalUploadService
} from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';

// SweetAlert
import swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit, OnDestroy {
  loading: boolean;

  total: number;
  pagina: number;
  hospitales: Hospital[];

  subsBusqueda: Subscription;
  subsModalUpl: Subscription;
  subsHospitals: Subscription;
  subsUpdate: Subscription;
  subsDelete: Subscription;
  subsNew: Subscription;

  constructor(
    private _hospitalService: HospitalService,
    private _modalUpload: ModalUploadService
  ) {
    this.loading = true;
    this.total = 0;
    this.pagina = 0;
    this.hospitales = [];
  }

  ngOnInit() {
    this.getHospitals();

    this.subsModalUpl = this._modalUpload.notificacion.subscribe(resp => {
      this.getHospitals();
    });
  }

  getHospitals() {
    this.loading = true;
    this.subsHospitals = this._hospitalService
      .getHospitals(this.pagina)
      .subscribe((resp: any) => {
        this.total = resp.total;
        this.hospitales = resp.hospitales;
        this.loading = false;
      });
  }

  pag(n: number) {
    if (this.pagina === 0 && n < 0) {
      return;
    }

    if ((this.pagina + n) * 5 >= this.total) {
      return;
    }

    this.pagina += n;
    this.getHospitals();
  }

  buscarHospital(busqueda: string) {
    if (busqueda.length <= 0) {
      this.getHospitals();
      return;
    }
    this.loading = true;
    this.subsBusqueda = this._hospitalService
      .searchHospitals(busqueda)
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.loading = false;
      });
  }

  mostrarModal(id: string, name: string) {
    this._modalUpload.openModal('hospitales', id, name);
  }

  guardarHospital(hospital: Hospital) {
    this.subsUpdate = this._hospitalService
      .updateHospital(hospital)
      .subscribe(() => {
        this.showDialog('Hospital actualizado');
      });
  }

  crearHospital() {
    swal({
      title: 'Crear nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCloseButton: true,
      confirmButtonText: 'Crear nuevo'
    }).then(name => {
      if (name.value && name.value.length > 0) {
        this.subsNew = this._hospitalService.newHospital(name.value)
          .subscribe(() => {
            this.showDialog(`Hospital ${name.value} creado`);
            this.getHospitals();
          });
      }
    });
  }

  borrarHospital(hospital: Hospital) {
    swal({
      title: '¿Estas seguro?',
      text: `Esta a punto de eliminar el hospital ${hospital.name}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then(result => {
      if (result.value) {
        this.subsDelete = this._hospitalService
          .deleteHospital(hospital._id)
          .subscribe(() => {
            this.getHospitals();
            this.showDialog('Hospital eliminado correctamente');
          });
      }
    });
  }

  showDialog(title: string) {
    swal({
      type: 'success',
      title: `${title}`,
      showConfirmButton: false,
      timer: 1500
    });
  }

  ngOnDestroy() {
    this.subsHospitals.unsubscribe();
    this.subsModalUpl.unsubscribe();
    if (this.subsBusqueda) {
      this.subsBusqueda.unsubscribe();
    }
    if (this.subsUpdate) {
      this.subsUpdate.unsubscribe();
    }
    if (this.subsDelete) {
      this.subsDelete.unsubscribe();
    }
    if (this.subsNew) {
      this.subsNew.unsubscribe();
    }
  }
}
