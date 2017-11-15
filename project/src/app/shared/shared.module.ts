import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { DropDownDirective } from '../header/dropdown.directive';
import { GooglePlacesService } from './google.places.service';
import { HttpService } from './http.service';
import { HttpAuthInterceptor } from './http.interceptor';
@NgModule({
    declarations:[
        DropDownDirective
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
        DropDownDirective
       ]
})
export class SharedModule{

}