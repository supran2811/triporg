import {TestBed , async, tick, fakeAsync} from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Rx';
import { Actions } from '@ngrx/effects';

import * as fromAuth from '../../../auth/store/auth.reducer';
import * as AuthActions from '../../../auth/store/auth.action';
import * as PinnedViewActions from './pinnedview.action';
import { User } from '../../../models/user.model';
import { PinnedViewEffects } from './pinnedview.effect';
import { Place } from '../../../models/place.model';
import { City } from '../../../models/city.model';

describe("PinnedViewEffects", () => {


    it("check if pinnedview effect return correct response" , async(() => {
        const source = cold('a' , {a : {type:PinnedViewActions.GET_PINNED_CITIES_FROM_SERVER}});

        const data = {"1" : { "id":"1","lat":1.0,"lng":1.0,"name":"Test name1" , "photos":[{"small":"smallurl","large":"largeurl"}],
                        "places":{"1":{ "address":"Test Address", "displayName":"Sample name", 
                        "iconUrl":"http://Sample/" , "lat":1.0,"lng":1.0 , 
                        "placeId":"2","rating":0,"photos":[]}} }};


        const cities = Object.values(data).map(res =>{
                let savedPlaces = [];
                if(res.places != null){
                savedPlaces = Object.values(res.places).map(place =>{
                    return new Place(place.placeId,place.lat,place.lng,place.displayName,place.iconUrl,
                                place.address,place.photos);
                })
            }
            return new City(res.id,res.name,res.lat,res.lng,savedPlaces , res.photos);
        });
                        

        const service = createHttpServiceStub(data);

        const store = getStoreStub();

        const effect = new PinnedViewEffects(new Actions(source),service,store);

        const expectedResponse = cold('a' , {a : {type:PinnedViewActions.SET_PINNED_CITIES , payload:cities}});

        expect(effect.getPinnedCities).toBeObservable(expectedResponse);

    }));
})

function createHttpServiceStub(response:any){
    const service = jasmine.createSpyObj('service',['get']);

    const isError =  response == null;

    const seriviceResponse = isError? Observable.throw(response):Observable.of(response);

    service.get.and.returnValue(seriviceResponse);

    return service;
}

function getStoreStub():any {
    const state = fromAuth.AuthReducer(undefined , new AuthActions.SetUserAction(new User("test@email.com","test name")));

    return {
        select: () => Observable.of(state) 
    }

}