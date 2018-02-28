
import {TestBed , async, tick, fakeAsync} from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Rx';
import { Actions } from '@ngrx/effects';
import { ErrorModel } from '../../models/error.model';
import {City} from '../../models/city.model';

import * as fromPlaceReducer from './place.reducer';
import * as PlaceActions from './place.action';
import * as fromAuthReducer from '../../auth/store/auth.reducer';
import * as AuthActions from '../../auth/store/auth.action';
import { PlacesEffect } from './place.effect';
import * as PinnedActions from '../../home/pinned-view/store/pinnedview.action';
import { Place } from '../../models/place.model';


describe('PlaceEffects' , () => {
     it('Test getGeoLocation returns city from google service' , async(() =>{
          const source = cold('a' , {a: {type:PlaceActions.GET_CITY_LOCATION}});

          const city = new City("test-placeid",'shortname' , 1.2,
                                            1.3);

          const googleService = createGooglePlaceServiceStub(city,'getGeoCode');

          const httpService = createHttpServiceStub({},'get');

          const store = getStoreStub(new PlaceActions.ResetState(),new AuthActions.LogoutAciton());

          const effect = new PlacesEffect(new Actions(source) , googleService,store,httpService);

          const expectedResponse = cold('(ab)'  , {a : {type:PlaceActions.SET_CITY , payload:city} , 
                                                        b:{type:PinnedActions.SET_SELECTED_PINNED_CITY,payload:city}});

          expect(effect.getLocation).toBeObservable(expectedResponse);                                              

     }));

     it("Test getGeoLoacation returns errror in case of error thrown from google service" , async(() =>{
        const source = cold('a' , {a: {type:PlaceActions.GET_CITY_LOCATION}});

        const error = new ErrorModel(-1  , "Unknown error");
        const googleService = createGooglePlaceServiceStub(error,'getGeoCode');
        const httpService = createHttpServiceStub({},'get');

        const store = getStoreStub(new PlaceActions.ResetState(),new AuthActions.LogoutAciton());

        const effect = new PlacesEffect(new Actions(source) , googleService,store,httpService);

        const expectedResponse  = cold('(-c|)' , {c: new PlaceActions.SetError(error)});

        expect(effect.getLocation).toBeObservable(expectedResponse);
     }));

     it("Test add place change listener returns correct place" , async(() => {
         const source = cold('a' , {a : {type:PlaceActions.ADD_PLACE_CHANGE_LISTENER , payload:{input:"sample",boundary:"boundary"}}});

         const response = {
            place_id:'testid',
            geometry : {
                location : {
                    lat: () => 1.2,
                    lng: () => 1.3
                }
            },
            name:'plance name',
            icon:'sample icon',
            formatted_address:'sample address',
            photos : [
                {
                    getUrl : ({}) => "htttp://SampleUlr"
                }
            ]
         };
         
         const googleService = createGooglePlaceServiceStub(response,'addPlaceChangeListener');

          const httpService = createHttpServiceStub({},'get');

          const store = getStoreStub(new PlaceActions.ResetState(),new AuthActions.LogoutAciton());

          const effect = new PlacesEffect(new Actions(source) , googleService,store,httpService);


          const place  = new Place(response.place_id , 
                                    response.geometry.location.lat() , 
                                    response.geometry.location.lng() , 
                                    response.name , response.icon,
                                    response.formatted_address);
         if(response.photos){
            place.photos = response.photos.map(photo => (
            {small:photo.getUrl({'maxWidth': 200}) , 
            large:photo.getUrl({'maxWidth': 800 })}
            ));
         }  

          const expectedResponse = cold('a' , {a : {type:PlaceActions.SET_PLACE_DETAILS , payload:{place : place , isHover:false}}});

          expect(effect.addPlaceChange).toBeObservable(expectedResponse);

     }));

     it("Test add place change listener when photos are null" , async(() => {
        const source = cold('a' , {a : {type:PlaceActions.ADD_PLACE_CHANGE_LISTENER , payload:{input:"sample",boundary:"boundary"}}});

        const response = {
           place_id:'testid',
           geometry : {
               location : {
                   lat: () => 1.2,
                   lng: () => 1.3
               }
           },
           name:'plance name',
           icon:'sample icon',
           formatted_address:'sample address',
           photos:[]
        };
        
        const googleService = createGooglePlaceServiceStub(response,'addPlaceChangeListener');

         const httpService = createHttpServiceStub({},'get');

         const store = getStoreStub(new PlaceActions.ResetState(),new AuthActions.LogoutAciton());

         const effect = new PlacesEffect(new Actions(source) , googleService,store,httpService);


         const place  = new Place(response.place_id , 
                                   response.geometry.location.lat() , 
                                   response.geometry.location.lng() , 
                                   response.name , response.icon,
                                   response.formatted_address);
        if(response.photos){
           place.photos = response.photos.map(photo => (
           {small:photo.getUrl({'maxWidth': 200}) , 
           large:photo.getUrl({'maxWidth': 800 })}
           ));
        }  

         const expectedResponse = cold('a' , {a : {type:PlaceActions.SET_PLACE_DETAILS , payload:{place : place , isHover:false}}});

         expect(effect.addPlaceChange).toBeObservable(expectedResponse);

    }));

    it("Test add place change listener when error is thrown" , async(() => {
        const source = cold('a' , {a : {type:PlaceActions.ADD_PLACE_CHANGE_LISTENER , payload:{input:"sample",boundary:"boundary"}}});

        const response = new ErrorModel(-1 , "Place Not Available");
        
        const googleService = createGooglePlaceServiceStub(response,'addPlaceChangeListener');

         const httpService = createHttpServiceStub({},'get');

         const store = getStoreStub(new PlaceActions.ResetState(),new AuthActions.LogoutAciton());

         const effect = new PlacesEffect(new Actions(source) , googleService,store,httpService);

         const expectedResponse = cold('(-c|)' , {c: new PlaceActions.SetError(response)});

         expect(effect.addPlaceChange).toBeObservable(expectedResponse);

    }));
});


function createGooglePlaceServiceStub(response:any,methodName:string){
  const service = jasmine.createSpyObj('GoogleService',['getGeoCode' , 'addPlaceChangeListener']);

  const  hasError = response instanceof ErrorModel;

  const serviceResponse = hasError?Observable.throw(response) : Observable.of(response);

  if(methodName === 'getGeoCode')  
    service.getGeoCode.and.returnValue(serviceResponse);
  else if(methodName === 'addPlaceChangeListener')
    service.addPlaceChangeListener.and.returnValue(serviceResponse);

  return service;
}

function createHttpServiceStub(response:any , methodName:string){
    const service = jasmine.createSpyObj('service',['get','put']);

    const isError =  response == null;

    const seriviceResponse = isError? Observable.throw(response):Observable.of(response);
    
    if(methodName === 'get')
        service.get.and.returnValue(seriviceResponse);
    else if(methodName === 'put')
        service.put.and.returnValue(seriviceResponse);   

    return service;
}

function getStoreStub(placeAction:PlaceActions.PlaceActions , authAction:AuthActions.AuthActions):any {
    const placeState = fromPlaceReducer.placeReducer(undefined,placeAction);
    const authState = fromAuthReducer.AuthReducer(undefined,authAction);

    return {
        select : (selector) => (selector == 'place'? Observable.of(placeState) : Observable.of(authState)  )
    }
}