import {TestBed , async, tick, fakeAsync} from '@angular/core/testing';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Rx';
import { Actions } from '@ngrx/effects';

import { AuthEffect } from './auth.effect';
import * as AuthActions from './auth.action';
import * as AppActions from '../../store/app.actions';
import { User } from '../../models/user.model';
import * as PlaceActions from '../../place/store/place.action';
import * as PinnedViewActions from '../../home/pinned-view/store/pinnedview.action';

describe("AuthEffects" , () => {
    it('check if register works',async(() => {
        const user = new User("supran@email.com","supran sengupta");

        const source = cold('a' , {a : {type:AuthActions.DO_REGISTER , payload : {user:user , password:"testpassword"}}});

        const service = createServiceStubToRegister({});

        const authEffect  = new AuthEffect(new Actions(source),service);

        authEffect.register.pairwise().take(1).subscribe(([result1, result2]) => {
            expect(result1).toEqual({type:AuthActions.SET_USER,payload:user});
            expect(result2).toEqual({type:AppActions.HIDE_MODAL});
        });
    }));

    it('check if login works', async(() => {
        const source = cold('a' , {a : {type:AuthActions.DO_LOGIN , payload:{email:"supran@email.com",password:"testpassword",returnUrl:"/"}}});
        const service = createServiceStubToLogin({});
        const authEffect  = new AuthEffect(new Actions(source),service);

        const response = cold('a' , {a : {type:AppActions.HIDE_MODAL}});
        expect(authEffect.login).toBeObservable(response);
    }));

    it("check if token is returned",() => {
        const source = cold('a' , {a:{type:AuthActions.GET_TOKEN}});
        const user = new User("test@email.com","Test name");
        const service = createServiceStubToGetToken({token:"sample token" , uid:"sample userid" , user:user});
        const authEffect  = new AuthEffect(new Actions(source),service);

        const expected = cold('(abc)' , {a : {type:AuthActions.SET_TOKEN,payload:{token:"sample token",uid:"sample userid"}},
                                        b:{type:AuthActions.LOGIN},
                                        c:{ type:AuthActions.SET_USER,payload:user}});

        expect(authEffect.getToken).toBeObservable(expected);
        
    });

    it("Check if user logout" , () => {
        const source = cold('a' , {a:{type:AuthActions.DO_LOGOUT}});
        const service = createServiceStubToLogout({});
        const authEffect  = new AuthEffect(new Actions(source),service);

        const expectedResposne = cold('(abc)' , { a: { type : AuthActions.LOGOUT}, 
                                            b: {type:PlaceActions.RESET_STATE},
                                            c: { type:PinnedViewActions.RESET_PINNED_STATE}});

        expect(authEffect.logout).toBeObservable(expectedResposne);
    });
    
})

function createServiceStubToRegister(response:any){
    const service = jasmine.createSpyObj('service',['register']);

    const isError =  response.type === AuthActions.SHOW_ERROR;

    const seriviceResponse = isError? Observable.throw(response):Observable.of(response);

    service.register.and.returnValue(seriviceResponse);

    return service;
}

function createServiceStubToLogin(response:any){
    const service = jasmine.createSpyObj('service',['signIn']);

    const isError =  response.type === AuthActions.SHOW_ERROR;

    const seriviceResponse = isError? Observable.throw(response):Observable.of(response);

    service.signIn.and.returnValue(seriviceResponse);

    return service;
}

function createServiceStubToGetToken(response:any){
    const service = jasmine.createSpyObj('service',['getToken']);

    const isError =  response.type === AuthActions.SHOW_ERROR;

    const seriviceResponse = isError? Observable.throw(response):Observable.of(response);

    service.getToken.and.returnValue(seriviceResponse);

    return service;
}

function createServiceStubToLogout(response:any){
    const service = jasmine.createSpyObj('service',['logOut']);

    const isError =  response.type === AuthActions.SHOW_ERROR;

    const seriviceResponse = isError? Observable.throw(response):Observable.of(response);

    service.logOut.and.returnValue(seriviceResponse);

    return service;
}