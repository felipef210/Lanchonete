import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

import { LOCALE_ID } from '@angular/core';
import { importProvidersFrom } from '@angular/core';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePt);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
