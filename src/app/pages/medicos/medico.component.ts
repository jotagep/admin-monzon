import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { MedicoService, HospitalService, ModalUploadService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

// SweetAlert
import swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit, OnDestroy {

  hospitales: Hospital[];
  hospital: Hospital;
  medico: Medico;
  formMedico: {
    name: string,
    hospital: string
  };

  subsHospitales: Subscription;
  subsMedico: Subscription;
  subsRoute: Subscription;
  subsModal: Subscription;

  constructor(
    private _medicoService: MedicoService,
    private _hospitalService: HospitalService,
    private route: ActivatedRoute,
    private router: Router,
    private _modalService: ModalUploadService
  ) {

    this.formMedico = {
      name: '',
      hospital: ''
    };
    this.hospital = new Hospital('');
    this.hospitales = [];
  }

  ngOnInit() {
    this.subsHospitales = this._hospitalService.getHospitals()
    .subscribe((resp: any) => {
      this.hospitales = resp.hospitales;
    });
    this.subsRoute = this.route.params.subscribe( p => {
      const id = p['id'];

      if (id !== 'nuevo') {
        this.cargarMedico(id);
      }
    });

    this.subsModal = this._modalService.notificacion
      .subscribe(resp => {
        this.medico.img = resp.medico.img;
      });
  }

  cargarMedico (id: string) {
    this.subsMedico = this._medicoService.getMedico(id)
      .subscribe( (medico: Medico) => {
        this.medico = medico;
        this.formMedico.name = medico.name;
        this.formMedico.hospital = medico.hospital._id;

        this.hospital = medico.hospital;
      });
  }

  guardarMedico(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (this.medico) {
      this.subsMedico = this._medicoService.updateMedico(this.formMedico, this.medico._id)
      .subscribe((medico: Medico) => {
        this.showDialog(`Medico ${medico.name} actualizado`);
      });
    } else {
      this.subsMedico = this._medicoService.newMedico(this.formMedico)
      .subscribe((medico: Medico) => {
        this.showDialog(`Medico ${medico.name} creado`);
        this.router.navigate([`medico`, medico._id]);
      });
    }
  }

  cambioHospital(id: string) {
    this.hospital =  this.hospitales.find( el => id === el._id);
    console.log(this.hospital);
  }

  cambiarFoto() {
    this._modalService.openModal('medicos', this.medico._id, this.medico.name);
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
    this.subsRoute.unsubscribe();
    this.subsModal.unsubscribe();
    this.subsHospitales.unsubscribe();
    if (this.subsMedico) {
      this.subsMedico.unsubscribe();
    }
  }

}
