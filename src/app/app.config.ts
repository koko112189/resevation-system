import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule,MatSelectModule,BrowserAnimationsModule,RouterModule.forRoot([])), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
