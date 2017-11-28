import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {NgProgressModule} from 'ngx-progressbar'
import { FormsModule } from '@angular/forms';
import { AgmCoreModule , GoogleMapsAPIWrapper} from '@agm/core'
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window'
import { RouteReuseStrategy } from '@angular/router';

import { DropDownDirective } from '../header/dropdown.directive';
import { GooglePlacesService } from './google.places.service';
import { HttpService } from './http.service';
import { HttpAuthInterceptor } from './http.interceptor';
import { PlaceRouterStrategy } from '../place/place.router.strategy';


@NgModule({
    declarations:[
        DropDownDirective
    ],
    imports:[
        NgProgressModule,
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,
        FormsModule
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
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,
        FormsModule
       ]
})
export class SharedModule{

}