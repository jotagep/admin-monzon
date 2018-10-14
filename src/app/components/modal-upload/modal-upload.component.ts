import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

// SweetAlert
import swal from 'sweetalert2';
import { Usuario } from '../../models/usuario.model';

import { SubirArchivoService, ModalUploadService } from '../../services/service.index';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit, OnDestroy {

  tipo: string;
  id: string;

  usuario: Usuario;

  imgTemp: string;
  imgUpload: File;

  subsUpload: Subscription;

  @ViewChild('upl') buttonUpl: ElementRef;

  constructor(
    private _uploadService: SubirArchivoService,
    public _modalUpload: ModalUploadService
  ) {

  }

  ngOnInit() {
    console.log('Modal listo');
  }


  onFileSelected(event) {
    const archivo = event.target.files[0];
    if (archivo.type.startsWith('image')) {
      this.imgUpload = archivo;
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onloadend = () => this.imgTemp = <string>reader.result;

    } else {
      swal('Error archivo', 'El archivo no es una imagen', 'error');
    }
  }

  subirArchivo() {
    this.subsUpload = this._uploadService.subirArchivo(this.imgUpload, this._modalUpload.tipo, this._modalUpload.id)
      .subscribe( (resp: any) => {
        swal({
          type: 'success',
          title: `Imagen ${this._modalUpload.name} actualizada`,
          showConfirmButton: false,
          timer: 1500
        });
        this.closeModal();
        this._modalUpload.notificacion.emit(resp);
      });
  }

  closeModal() {
    this.imgTemp = null;
    this.imgUpload = null;
    this.buttonUpl.nativeElement.value = '';

    this._modalUpload.closeModal();
  }

  ngOnDestroy() {
    if (this.subsUpload) {
      this.subsUpload.unsubscribe();
    }
  }
}
