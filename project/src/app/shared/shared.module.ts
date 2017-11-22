import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {NgProgressModule} from 'ngx-progressbar'
import { AgmCoreModule } from '@agm/core'

import { DropDownDirective } from '../header/dropdown.directive';
import { GooglePlacesService } from './google.places.service';
import { HttpService } from './http.service';
import { HttpAuthInterceptor } from './http.interceptor';
@NgModule({
    declarations:[
        DropDownDirective
    ],
    imports:[
        NgProgressModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyBlYYoEJ_1oksaGdQO2KG6FDjt4g9E8l0w",
            libraries: ["places"]
          })
    ],
    providers:[
        HttpService,
        {
            provide:HTTP_INTERCEPTORS,
            useClass : HttpAuthInterceptor,
            multi : true
        },
        GooglePlacesService 
       ],
       exports:[
        CommonModule,
        DropDownDirective,
        NgProgressModule
       ]
})
export class SharedModule{

}