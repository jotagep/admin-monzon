import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  id: string;
  tipo: string;
  name: string;

  show: boolean;

  notificacion = new EventEmitter<boolean>();

  constructor() {
    this.show = false;
  }

  openModal(tipo: string, id: string, name: string) {
    this.show = true;
    this.name = name;
    this.id = id;
    this.tipo = tipo;
  }

  closeModal() {
    this.show = false;
    this.id = null;
    this.tipo = null;
  }

}
