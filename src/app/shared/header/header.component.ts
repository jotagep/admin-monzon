import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { UsuarioService } from '../../services/service.index';

import { Usuario } from './../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  @ViewChild('searchInput') searchInput: ElementRef;

  constructor(
    private _userService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usuario = this._userService.usuario;
  }

  logout() {
    this._userService.logout();
  }

  buscar(termino: string) {
    this.router.navigate(['busqueda', termino]);
  }

  searchFocus(): void {
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 100);
  }

}
