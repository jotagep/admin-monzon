import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { MedicoService, ModalUploadService } from '../../services/service.index';
import { Medico } from '../../models/medico.model';

// SweetAlert
import swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit, OnDestroy {

  loading: boolean;

  total: number;
  pagina: number;
  medicos: Medico[];

  subsBusqueda: Subscription;
  subsModalUpl: Subscription;
  subsMedicos: Subscription;
  subsUpdate: Subscription;
  subsDelete: Subscription;
  subsNew: Subscription;


  constructor(
    private _medicoService: MedicoService,
    private _modalUpload: ModalUploadService
  ) {
    this.loading = true;
    this.total = 0;
    this.pagina = 0;
    this.medicos = [];
  }

  ngOnInit() {
    this.getMedicos();

    this.subsModalUpl = this._modalUpload.notificacion.subscribe( resp => {
      this.getMedicos();
    });
  }

  getMedicos() {
    this.loading = true;
    this.subsMedicos = this._medicoService
      .getMedicos(this.pagina)
      .subscribe((resp: any) => {
        this.total = resp.total;
        this.medicos = resp.medicos;
        this.loading = false;
      });
  }

  crearMedico() {

  }

  buscarMedico(busqueda: string) {
    if (busqueda.length <= 0) {
      this.getMedicos();
      return;
    }
    this.loading = true;
    this.subsBusqueda = this._medicoService
      .searchMedicos(busqueda)
      .subscribe((medicos: Medico[]) => {
        this.medicos = medicos;
        this.loading = false;
      });
  }

  editarMedico( med: Medico) {

  }

  borrarMedico( med: Medico) {
    swal({
      title: '¿Estas seguro?',
      text: `Esta a punto de eliminar el médico ${med.name}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then(result => {
      if (result.value) {
        this.subsDelete = this._medicoService
          .deleteMedico(med._id)
          .subscribe(() => {
            this.getMedicos();
            this.showDialog('Médico eliminado correctamente');
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

  mostrarModal(id: string, name: string) {
    this._modalUpload.openModal('medicos', id, name);
  }

  pag(n: number) {
    if (this.pagina === 0 && n < 0) {
      return;
    }

    if ((this.pagina + n) * 5 >= this.total) {
      return;
    }

    this.pagina += n;
    this.getMedicos();
  }

  ngOnDestroy() {
    this.subsMedicos.unsubscribe();
    this.subsModalUpl.unsubscribe();
  }
}
