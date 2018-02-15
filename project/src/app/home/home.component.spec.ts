import {TestBed , async, tick, fakeAsync}        from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store }          from '@ngrx/store';
import { APP_BASE_HREF } from '@angular/common';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as AuthActions from '../auth/store/auth.action';
import { HomeModule } from './home.module';
import { User } from '../models/user.model';
import { HomeComponent } from './home.component';
import { AppModule } from '../app.module';

let fixture,home;    
let store:Store<fromApp.AppState>;

describe("HomeComponent" , () => {

    beforeEach( async(() => {
        TestBed.configureTestingModule({
            imports:[AppModule,HomeModule],
            providers:[{provide: APP_BASE_HREF, useValue: '/'}]
        });
        fixture = TestBed.createComponent(HomeComponent);
        home = fixture.debugElement.componentInstance;
    }));

    it("Pinned View should not be visible only when user is unauthenticated" , async(() => {
        const de = fixture.debugElement.query(By.css(".pinnedview"));
        expect(de).toBeNull();
    }));

});