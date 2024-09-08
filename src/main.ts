/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),  // Configura el enrutador con las rutas definidas
    importProvidersFrom(BrowserAnimationsModule)
  ]
})
.catch(err => console.error(err));
