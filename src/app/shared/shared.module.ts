import { NgModule } from '@angular/core';

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
    imports: [ ],
    exports: [
        NotPageFoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent
    ],
    providers: [],
})
export class SharedModule { }
