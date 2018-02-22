
import { RouterModule, Routes , RouteReuseStrategy } from '@angular/router';
import { NgModule } from '@angular/core';

import { AddNewPlaceComponent } from './add-new-place/add-new-place.component';
import { PlaceComponent } from './place.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { AddNewInterniryComponent } from './add-new-interniry/add-new-interniry.component';

const placeRoutes:Routes = [
    {
        path:'' , component:PlaceComponent 
        , children :[
            {path:'' , component:AddNewPlaceComponent},
        ]
    },
    {
        path:'place/:id',component:PlaceDetailsComponent
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