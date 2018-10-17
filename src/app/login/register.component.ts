import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
// SweetAlert
import swal from 'sweetalert2';

// Services
import { UsuarioService } from '../services/service.index';

// Models
import { Usuario } from '../models/usuario.model';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subsRegister: Subscription;

  constructor(
    private _userService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit() {
    init_plugins();

    if (this._userService.estaLogueado()) {
      this.router.navigate(['/dashboard']);
    }

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl( false )
    }, { validators: this.sonIguales('password', 'password2')});
  }

  sonIguales(campo1: string, campo2: string) {
    return ( group: FormGroup ) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      return pass1 === pass2 ? null : { sonIguales: true };
    };
  }

  registrarUsuario() {
    if (this.form.invalid) { return; }

    if (!this.form.value.condiciones) {
      swal('Importante!', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    const user = new Usuario(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );

    this.subsRegister = this._userService.crearUser(user)
      .subscribe(resp => {
        swal('Usuario Creado', user.email, 'success');
        this.router.navigate(['/login']);
      },
      err => {
        swal(err.error.mensaje, err.error.errors.message, 'error');
        this.form.reset();
      }
    );
  }

  ngOnDestroy() {
    if (this.subsRegister) {
      this.subsRegister.unsubscribe();
    }
  }
}
