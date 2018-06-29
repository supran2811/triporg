import { enableProdMode, TRANSLATIONS, TRANSLATIONS_FORMAT ,MissingTranslationStrategy } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare const require;

if (environment.production) {
  enableProdMode();
}

const translations = require(`raw-loader!./locale/messages.en.xlf`);

platformBrowserDynamic().bootstrapModule(AppModule , { 
  missingTranslation: MissingTranslationStrategy.Error,
  providers: [
  {provide: TRANSLATIONS, useValue: translations},
  {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'}
]})
  .catch(err => console.log(err));
