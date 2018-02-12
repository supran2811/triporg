import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoadingSameRouteComponent } from './loading-same-route/loading-same-route.component';

const appRouter:Routes = [
    {
        path:'',component:HomeComponent
    },
    {
        path:'city/:id' , loadChildren:'./place/place.module#PlaceModule'
    }
    // ,
    // {
    //     path: 'same' , component:LoadingSameRouteComponent
    // }
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRouter,{preloadingStrategy:PreloadAllModules})
    ],
    exports:[
        RouterModule
    ]
})
export class AppRouterModule{}