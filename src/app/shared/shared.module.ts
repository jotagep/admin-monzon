import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Pipes Module
import { PipesModule } from '../pipes/pipes.module';

// Components
import { NotPageFoundComponent } from './not-page-found/not-page-found.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
    declarations: [
        NotPageFoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        PipesModule
     ],
    exports: [
        NotPageFoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ],
    providers: [],
})
export class SharedModule { }
