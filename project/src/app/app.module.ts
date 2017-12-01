import { AuthEffect } from './auth/store/auth.effect';
import { AuthRouterModule } from './auth/auth.router.module';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NguiAutoCompleteModule} from '@ngui/auto-complete'
import { AgmCoreModule } from '@agm/core/core.module';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window'


import { SharedModule } from './shared/shared.module';
import { CityEffects } from './home/store/city.effect';
import { globalReducer } from './store/app.reducer';
import { AppRouterModule } from './app.router.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PinnedViewComponent } from './home/pinned-view/pinned-view.component';
import { PinnedViewItemComponent } from './home/pinned-view/pinned-view-item/pinned-view-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PinnedViewComponent,
    PinnedViewItemComponent
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
    NguiAutoCompleteModule,
    StoreModule.forRoot(globalReducer),
    EffectsModule.forRoot([CityEffects,AuthEffect])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
