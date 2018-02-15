import {TestBed , async, tick, fakeAsync}        from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store }          from '@ngrx/store';
import { APP_BASE_HREF }        from '@angular/common';

import { AppModule }            from '../app.module';
import { HeaderComponent }      from './header.component';
import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as AuthActions from '../auth/store/auth.action';
import { User } from '../models/user.model';

let fixture,header;    
let store:Store<fromApp.AppState>;

describe('HeaderComponent', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports:[
            AppModule
        ],
        providers:[{provide: APP_BASE_HREF, useValue: '/'}]
      }).compileComponents();

      fixture = TestBed.createComponent(HeaderComponent);
      header = fixture.debugElement.componentInstance;

    }));
    
    it('should create the header first', async(() => {
      
      expect(header).toBeTruthy();
    }));
  
    it("Brand name should be visible only for home page" , async(() => {
        header.currentUrl = "/";
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css(".navbar-brand"));
        const el = de.nativeElement;
        expect(el.textContent.trim()).toBe(header.appName);
        
    }));

    it("Brand name should not be visible only for pages other than home" , async(() => {
        header.currentUrl = "/city";
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css(".navbar-brand"));
        const el = de.nativeElement;
        expect(el.textContent.trim()).toBe("");
        
    }));
  
    it("SigIn and SignOut must not be visible only when user is loggedin" ,  fakeAsync(() => {
        store = fixture.debugElement.injector.get( Store );
        store.dispatch(new AuthActions.SetUserAction(new User("test@test.com","test name")));
        tick(100);
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css(".right-nav"));
        expect(de).toBeNull();
    }));

    it("Logout must be visible when user has loggedin" , fakeAsync(() => {
        store = fixture.debugElement.injector.get( Store );
        store.dispatch(new AuthActions.SetUserAction(new User("test@test.com","test name")));
        tick(100);
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css(".dropdown-menu"));
        expect(de.nativeElement.textContent.trim()).toEqual(header.logOutLabel);
    }));

    it("Loggedin User must see his name in header" , fakeAsync(() => {
        store = fixture.debugElement.injector.get( Store );
        store.dispatch(new AuthActions.SetUserAction(new User("test@test.com","test name")));
        tick(100);
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css(".dropdown-toggle"));
        expect(de.nativeElement.textContent.trim()).toEqual("test name");
    }))
  });