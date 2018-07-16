
import { RouterModule, Routes , RouteReuseStrategy } from '@angular/router';
import { NgModule } from '@angular/core';

import { PlaceComponent } from './place.component';
import { PlaceDetailsComponent } from './place-details/place-details.component';


const placeRoutes:Routes = [
    {
        path:'' , component:PlaceComponent 
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