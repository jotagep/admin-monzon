import { Routes, RouterModule } from '@angular/router';

// Components

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NotPageFoundComponent } from './shared/not-page-found/not-page-found.component';
import { PagesComponent } from './pages/pages.component';

import { LoginGuard, VerifyTokenGuard } from './services/service.index';

const appRouter: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: PagesComponent,
        canActivateChild: [LoginGuard, VerifyTokenGuard],
        loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: NotPageFoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRouter, { useHash: true });
