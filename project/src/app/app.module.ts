
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';

import {NguiAutoCompleteModule} from '@ngui/auto-complete'

import { globalReducer } from './store/app.reducer';
import { AppRouterModule } from './app.router.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { PlaceComponent } from './place/place.component';
import { AddNewPlaceComponent } from './place/add-new-place/add-new-place.component';
import { PlaceListComponent } from './place/place-list/place-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthComponent,
    PlaceComponent,
    AddNewPlaceComponent,
    PlaceListComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule,
    FormsModule,
    NguiAutoCompleteModule,
    StoreModule.forRoot(globalReducer),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
