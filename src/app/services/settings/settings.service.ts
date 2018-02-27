import { Injectable, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {
  ajustes: Ajustes = {
    tema: 'default-dark'
  };

  constructor(@Inject(DOCUMENT) private _document) {
    this.cargarAjustes();
  }

  guardarAjustes(tema: String) {
    this.ajustes.tema = tema;
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));

    }
    this.aplicarTema(this.ajustes.tema);
  }

  aplicarTema(tema: String) {
    this._document
      .getElementById('tema')
      .setAttribute('href', `./assets/css/colors/${tema}.css`);
  }

  cambiarCheck(link: any) {
    const selector: any = document.querySelector('.working');
    selector.classList.remove('working');
    link.classList.add('working');
  }

  colocarCheck() {
    const selectors: any = document.querySelectorAll('.selector');

    for (const ref of selectors) {
      if (ref.getAttribute('data-theme') === this.ajustes.tema) {
        this.cambiarCheck(ref);
        break;
      }
    }
  }
}

interface Ajustes {
  tema: String;
}
