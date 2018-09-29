import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Temporal (Pruebas)
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Services Module
import { ServiceModule } from './services/service.module';

// Pipes Module
import { PipesModule } from './pipes/pipes.module';

// Custom modules
import { PagesModule } from './pages/pages.module';

// Routes
import { APP_ROUTES } from './app.routes';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    APP_ROUTES,
    PagesModule,
    PipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
