import { GooglePlacesService } from './google.places.service';

import { HttpAuthInterceptor } from './http.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { HttpService } from './http.service';
@NgModule({

    providers:[
        HttpService,
        {
            provide:HTTP_INTERCEPTORS,
            useClass : HttpAuthInterceptor,
            multi : true
        },
        GooglePlacesService 
       ]
})
export class SharedModule{

}