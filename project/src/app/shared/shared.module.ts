import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {NgProgressModule} from 'ngx-progressbar'
import { AgmCoreModule , GoogleMapsAPIWrapper} from '@agm/core'

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
        AgmCoreModule
    ],
    providers:[
        HttpService,
        {
            provide:HTTP_INTERCEPTORS,
            useClass : HttpAuthInterceptor,
            multi : true
        },
        GoogleMapsAPIWrapper,
        GooglePlacesService 
       ],
       exports:[
        CommonModule,
        DropDownDirective,
        NgProgressModule,
        AgmCoreModule
       ]
})
export class SharedModule{

}