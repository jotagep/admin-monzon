import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {
  constructor() {

    this.contarTres()
      .then( () => console.log('Termino!'))
      .catch( err => console.log(`Error en la promesa ${err}`));
  }

  ngOnInit() {}

  contarTres (): Promise<any> {
    return new Promise((resolve, reject) => {
      let counter = 0;

      const intervalo = setInterval(() => {
        counter += 1;
        console.log(counter);
        if (counter === 3) {
          resolve();
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
