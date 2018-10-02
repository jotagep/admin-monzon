import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import {
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  LoginGuard,
  SubirArchivoService,
  ModalUploadService
} from './service.index';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuard,
    SubirArchivoService,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule {}
