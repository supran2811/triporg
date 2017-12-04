import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import { AgmCoreModule } from '@agm/core/core.module';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window'


import { AuthModule } from './auth/auth.module';
import { AuthRouterModule } from './auth/auth.router.module';
import { AuthEffect } from './auth/store/auth.effect';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { PinnedViewEffects } from './home/pinned-view/store/pinnedview.effect';
import { CityEffects } from './home/store/city.effect';
import { globalReducer } from './store/app.reducer';
import { AppRouterModule } from './app.router.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
   
  ],
  imports: [
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyBlYYoEJ_1oksaGdQO2KG6FDjt4g9E8l0w', libraries: ['places'] }),
    AgmSnazzyInfoWindowModule,
    BrowserModule,
    AppRouterModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    AuthRouterModule,
    HomeModule,
    StoreModule.forRoot(globalReducer),
    EffectsModule.forRoot([CityEffects,AuthEffect,PinnedViewEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
