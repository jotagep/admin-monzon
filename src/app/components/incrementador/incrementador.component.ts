import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {
  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<Number> = new EventEmitter();
  @ViewChild('numberProgress') numberProgress: ElementRef;

  constructor() {

  }

  ngOnInit() {}

  onChanges(newValue: number) {
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    this.numberProgress.nativeElement.value  = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(n: number) {
    if ((this.progreso >= 100 && n > 0) || (this.progreso <= 0 && n < 0)) {
      return;
    }
    this.progreso += n;
    this.cambioValor.emit(this.progreso);
    this.numberProgress.nativeElement.focus();
  }
}
