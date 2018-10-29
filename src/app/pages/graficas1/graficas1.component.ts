import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

  graficos = [
    {
      labels: ['Usuarios', 'Hospitales', 'Médicos'],
      data: [8, 6, 14],
      type: 'doughnut',
      leyenda: 'DoctorAdmin'
    },
    {
      labels: ['Hombres', 'Mujeres'],
      data: [8, 10],
      type: 'doughnut',
      leyenda: 'Médicos'
    },
    {
      labels: ['Barcelona', 'Madrid'],
      data: [2, 4],
      type: 'doughnut',
      leyenda: 'Hospitales - Ciudades'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
