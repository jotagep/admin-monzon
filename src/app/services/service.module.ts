import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


// Services
import { SettingsService, SharedService, SidebarService, UsuarioService, LoginGuard, SubirArchivoService } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuard,
    SubirArchivoService
  ],
  declarations: []
})
export class ServiceModule { }
