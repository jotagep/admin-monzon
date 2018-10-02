import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  titulo: string;
  subsRoute: Subscription;

  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
    this.subsRoute = this.getDataRoute()
    .subscribe(data => {
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      this.meta.updateTag(metaTag);
    });
   }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
    .pipe(
      filter(event => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data )
    );
  }

  ngOnDestroy() {
    this.subsRoute.unsubscribe();
  }

}
