import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';

const appRouter:Routes = [
    {
        path:'',component:HomeComponent
    },
    {
        path:'place/:id' , loadChildren:'./place/place.module#PlaceModule'
    }
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