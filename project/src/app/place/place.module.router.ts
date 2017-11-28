import { AddNewInterniryComponent } from './add-new-interniry/add-new-interniry.component';
import { NothingSelectedComponent } from './nothing-selected/nothing-selected.component';
import { RouterModule, Routes , RouteReuseStrategy } from '@angular/router';
import { NgModule } from '@angular/core';

import { AddNewPlaceComponent } from './add-new-place/add-new-place.component';
import { PlaceComponent } from './place.component';
import { PlaceRouterStrategy } from './place.router.strategy';

const placeRoutes:Routes = [
    {
        path:'' , component:PlaceComponent , children :[
            {path:'new/place' , component:AddNewPlaceComponent},
            {path:'new/iternary' , component:AddNewInterniryComponent},
            {path:'' , component:NothingSelectedComponent},
            
        ]
    }
]

@NgModule({
    imports:[
        RouterModule.forChild(placeRoutes)
    ],
    providers:[
        {provide:RouteReuseStrategy , useClass:PlaceRouterStrategy}
    ],
    exports:[
        RouterModule
    ]
})
export class PlaceRouterModule{}