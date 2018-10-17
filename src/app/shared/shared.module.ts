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
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    declarations: [
        NotPageFoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
        ModalUploadComponent
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
        BreadcrumbsComponent,
        ModalUploadComponent
    ],
    providers: [],
})
export class SharedModule { }
