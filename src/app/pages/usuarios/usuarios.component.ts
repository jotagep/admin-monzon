import { Component, OnInit, OnDestroy } from '@angular/core';

import { Usuario } from '../../models/usuario.model';
import { UsuarioService, ModalUploadService } from '../../services/service.index';

import { Subscription } from 'rxjs/Subscription';

// SweetAlert
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit, OnDestroy {
  loading: boolean;

  total: number;
  pagina: number;
  usuarios: Usuario[];

  subsBusqueda: Subscription;
  subsUsers: Subscription;
  subsUpdate: Subscription;
  subsDelete: Subscription;
  subsModalUpl: Subscription;

  constructor(
    private _userService: UsuarioService,
    private _modalUpload: ModalUploadService
  ) {
    this.loading = true;
    this.total = 0;
    this.pagina = 0;
    this.usuarios = [];
  }

  ngOnInit() {
    this.getUsers();

    this.subsModalUpl = this._modalUpload.notificacion.subscribe( resp => {
      this.getUsers();
    });
  }

  getUsers() {
    this.loading = true;
    this.subsUsers = this._userService
      .getUsers(this.pagina)
      .subscribe((resp: any) => {
        this.total = resp.total;
        this.usuarios = resp.usuarios;
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
    this.getUsers();
  }

  buscarUser(busqueda: string) {
    if (busqueda.length <= 0) {
      this.getUsers();
      return;
    }
    this.loading = true;
    this.subsBusqueda = this._userService
      .searchUsers(busqueda)
      .subscribe((users: Usuario[]) => {
        this.usuarios = users;
        this.loading = false;
      });
  }

  guardarUser(user: Usuario) {
    this.subsUpdate = this._userService.updateUser(user)
      .subscribe(() => {
        this.showDialog('Usuario actualizado');
      });
  }

  borrarUser(user: Usuario) {
    if (user._id === this._userService.usuario._id) {
      swal('Error al eliminar', 'No se puede eliminar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Estas seguro?',
      text: `Esta a punto de eliminar a ${user.name}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!'
    }).then(result => {
      if (result.value) {
        this.subsDelete = this._userService.deleteUser(user._id)
          .subscribe( () => {
            this.getUsers();
            this.showDialog('Usuario eliminado correctamente');
          });
      }
    });
  }

  mostrarModal( id: string, name: string) {
    this._modalUpload.openModal('usuarios', id, name);
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
    this.subsUsers.unsubscribe();
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
  }
}
