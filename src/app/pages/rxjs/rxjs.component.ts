import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
      .subscribe(
        x => console.log(x),
        err => console.error(err),
        () => console.log(' - El observer termino - ')
      );
  }

  ngOnInit() {}

  regresaObservable(): Observable<any> {
    return new Observable<any>(observer => {
      let counter = 0;
      const intervalo = setInterval(() => {
        counter += 1;
        const salida = {
          valor: counter,
        };
        observer.next(salida);

        // if (counter === 5) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (counter === 4) {
        //   clearInterval(intervalo);
        //   observer.error('Error nens: ');
        // }
      }, 1000);
    }).pipe(
      retry(2),
      map( x => x.valor ),
      filter( n => n % 2 === 1)
    );
  }

  ngOnDestroy(): void {
    console.log('Se cerro');
    this.subscription.unsubscribe();
  }
}
