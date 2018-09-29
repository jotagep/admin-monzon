import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';

import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';

// SweetAlert
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit, OnDestroy {

  usuario: Usuario;
  subsGuardar: Subscription;

  imgTemp: string;
  imgUpload: File;
  subsImgUp: Subscription;

  @ViewChild('upl') buttonUpl: ElementRef;

  constructor(
    private _userService: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this._userService.usuario;
  }

  guardar(form: NgForm) {
    this.usuario.name = form.value.name;
    if (!this.usuario.google) {
      this.usuario.email = form.value.email;
    }

    this.subsGuardar = this._userService.updateUser(this.usuario)
      .subscribe( () => {
        this.showDialog('Actualizado correctamente');
      });
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

  updateImg() {
    this.subsImgUp = this._userService.updateImg(this.imgUpload)
      .subscribe(() => {
        this.buttonUpl.nativeElement.value = '';
        this.showDialog('Imagen actualizada');
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
    if (this.subsGuardar) {
      this.subsGuardar.unsubscribe();
    }
    if (this.subsImgUp) {
      this.subsImgUp.unsubscribe();
    }
  }

}
