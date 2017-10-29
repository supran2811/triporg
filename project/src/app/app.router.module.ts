import { PlaceComponent } from './place/place.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';


const appRoutes:Routes = [
    {path:'' , component:AuthComponent},
    {path:'home' , component:HomeComponent},
    {path:'place/:id' , component:PlaceComponent}
];

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRouterModule {}