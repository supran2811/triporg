
import { RouterModule, Routes , RouteReuseStrategy } from '@angular/router';
import { NgModule } from '@angular/core';

import { AddNewPlaceComponent } from './add-new-place/add-new-place.component';
import { PlaceComponent } from './place.component';

import { PlaceDetailsComponent } from './place-details/place-details.component';

const placeRoutes:Routes = [
    {
        path:'' , component:PlaceComponent , children :[
            {path:'new/place' , component:AddNewPlaceComponent},
            {path:'new/place/:id',component:PlaceDetailsComponent},
            {path:'' , redirectTo:'new/place'}
            
        ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(placeRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class PlaceRouterModule{}