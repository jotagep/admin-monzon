import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Menu } from '../../models/menu.interface';

@Injectable()
export class SidebarService {
  menu: Menu[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge ',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progress Bar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' },
        { titulo: 'Promesas', url: '/promesas' },
        { titulo: 'RxJS', url: '/rxjs' }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {titulo: 'Usuarios', url: '/usuarios'},
        {titulo: 'Hospitales', url: '/hospitales'},
        {titulo: 'Medicos', url: '/medicos'},
      ]
    }
  ];

  constructor() {}

  getMenu(): Observable<Menu[]> {
    return of(this.menu);
  }
}

