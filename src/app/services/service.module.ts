import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import {
  SettingsService,
  SharedService,
  UsuarioService,
  LoginGuard,
  SubirArchivoService,
  ModalUploadService,
  HospitalService,
  MedicoService,
  AdminGuard,
  VerifyTokenGuard
} from './service.index';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    SettingsService,
    SharedService,
    UsuarioService,
    LoginGuard,
    AdminGuard,
    VerifyTokenGuard,
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ],
  declarations: []
})
export class ServiceModule {}
