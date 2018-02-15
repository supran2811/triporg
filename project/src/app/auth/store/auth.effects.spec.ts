import {TestBed , async, tick, fakeAsync}        from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { AuthEffect } from './auth.effect';
import * as AuthActions from './auth.action';

describe("AuthEffects" , () => {

    // it("Test if logout clears the state of app" , async(() => {
    //    // const logoutEffect = new AuthEffect(new AuthActions.LogoutAciton()   );
    // }))

    // function createServiceStub(response: any) {
    //     const service = jasmine.createSpyObj('service', [ 'getDummyData' ]);
    
    //     const isError = response instanceof Error;
    //     const serviceResponse = isError ? Observable.throw(response) : Observable.of(response);
    
    //     service.getDummyData.and.returnValue(serviceResponse);
    
    //     return service;
    //   }
})