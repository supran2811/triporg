import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {NgProgressModule} from 'ngx-progressbar'
import { FormsModule } from '@angular/forms';
import { AgmCoreModule , GoogleMapsAPIWrapper} from '@agm/core'
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window'
import { RouteReuseStrategy } from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {SwiperModule,SWIPER_CONFIG,SwiperConfigInterface  } from 'ngx-swiper-wrapper';

import { DropDownDirective } from '../header/dropdown.directive';
import { GooglePlacesService } from './google.places.service';
import { HttpService } from './http.service';
import { HttpAuthInterceptor } from './http.interceptor';
import {WindowRefService} from './windowRef.service';
import {CacheStateService} from './cache.state.service';
import { ThumbnailViewComponent } from './thumbnail-view/thumbnail-view.component';
import { ThumbnailActionsComponent } from './thumbnail-actions/thumbnail-actions.component';
import { ImageViewComponent } from './image-view/image-view.component';
import { RatingComponent } from './rating/rating.component';
import { BackdropComponent } from './backdrop/backdrop.component';
import { ModalComponent } from './modal/modal.component';
import { LoginComponent } from '../auth/login/login.component';
import { GoogleAutocompleteComponent } from './google-autocomplete/google-autocomplete.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto',
    keyboardControl:false
  };

@NgModule({
    declarations:[
        DropDownDirective,
        ThumbnailViewComponent,
        ThumbnailActionsComponent,
        ImageViewComponent,
        RatingComponent,
        BackdropComponent,
        ModalComponent,
        GoogleAutocompleteComponent
    ],
    imports:[
        LazyLoadImageModule,
        NgProgressModule,
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,
        FormsModule,
        CommonModule,
        SwiperModule.forChild()
    ],
    
    providers:[
        HttpService,
        {
            provide:HTTP_INTERCEPTORS,
            useClass : HttpAuthInterceptor,
            multi : true
        },
        GoogleMapsAPIWrapper,
        GooglePlacesService,
        WindowRefService,
        CacheStateService
       ],
       exports:[
        CommonModule,
        DropDownDirective,
        NgProgressModule,
        AgmCoreModule,
        AgmSnazzyInfoWindowModule,
        FormsModule,
        SwiperModule,
        LazyLoadImageModule,
        ThumbnailViewComponent,
        ThumbnailActionsComponent,
        ImageViewComponent,
        RatingComponent,
        ModalComponent,
        GoogleAutocompleteComponent
       ]
})
export class SharedModule{

}