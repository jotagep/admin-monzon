import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    PagesModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
