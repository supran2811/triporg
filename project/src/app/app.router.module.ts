import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PlaceComponent } from './place/place.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';

const appRouter:Routes = [
    {
        path:'' , component:AuthComponent
    },
    {
        path:'home',component:HomeComponent
    },
    {
        path:'place/:id' , component:PlaceComponent
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