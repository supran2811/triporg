import { EffectsModule } from '@ngrx/effects';
import { PlaceRouterModule } from './place.module.router';
import { SharedModule } from '../shared/shared.module';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { PlaceListComponent } from './place-list/place-list.component';
import { AddNewPlaceComponent } from './add-new-place/add-new-place.component';
import { PlaceComponent } from './place.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { NothingSelectedComponent } from './nothing-selected/nothing-selected.component';
import { AddNewInterniryComponent } from './add-new-interniry/add-new-interniry.component';
import {placeReducer} from './store/place.reducer';
import { PlacesEffect } from './store/place.effect';


@NgModule({
    declarations:[
        PlaceComponent,
        AddNewPlaceComponent,
        PlaceListComponent,
        PlaceDetailsComponent,
        NothingSelectedComponent,
        AddNewInterniryComponent
    ],
    imports:[
      SharedModule,
      PlaceRouterModule,
      EffectsModule.forFeature([PlacesEffect]),
      StoreModule.forFeature('place',placeReducer)
    ]
})
export class PlaceModule{

}