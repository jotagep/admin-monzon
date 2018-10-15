import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UsuarioService } from './../services/usuario/usuario.service';
import { Subscription } from 'rxjs/Subscription';

// SweetAlert
import swal, { SweetAlertType } from 'sweetalert2';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string;
  recuerdame: boolean = false;

  auth2: any;
  @ViewChild('btnGoogle')
  buttonGoogle: ElementRef;

  loginUser: Subscription;

  constructor(private router: Router, private _userService: UsuarioService) {}

  ngOnInit() {
    init_plugins();

    if (this._userService.estaLogueado()) {
      this.router.navigate(['/dashboard']);
    }

    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '425845860292-qi82t0om4l6ateiigaq6dsdvp6nf15tt.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(this.buttonGoogle);
    });
  }

  attachSignIn(element: ElementRef) {
    this.auth2.attachClickHandler(element.nativeElement, {}, googleUser => {
      const token = googleUser.getAuthResponse().id_token;

      this._userService
        .loginGoogle(token)
        .subscribe(() => window.location.reload());
    });
  }

  ingresar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    if (form.value.recuerdame) {
      localStorage.setItem('email', form.value.email);
    } else {
      localStorage.removeItem('email');
    }

    this.loginUser = this._userService
      .loginUser(form.value.email, form.value.password)
      .subscribe(
        user => {
          this.showDialog(`Bienvenido ${user.name}`, 'success');
          this.router.navigate(['/dashboard']);
        },
        err => {
          form.resetForm();
          this.showDialog(err.error.mensaje, 'error');
        }
      );
  }

  showDialog(text: string, type: SweetAlertType) {
    swal({
      type: type,
      title: text,
      showConfirmButton: false,
      timer: 1500
    });
  }

  ngOnDestroy() {
    if (this.loginUser) {
      this.loginUser.unsubscribe();
    }
  }
}
