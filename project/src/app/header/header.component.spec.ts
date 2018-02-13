import {TestBed , async}        from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule }          from '@ngrx/store';
import { APP_BASE_HREF }        from '@angular/common';

import { HeaderComponent }      from './header.component';
import { DropDownDirective }    from './dropdown.directive';
import { globalReducer }        from '../store/app.reducer';
import { SharedModule }         from '../shared/shared.module';
import { AppRouterModule }      from '../app.router.module';
import { AppModule }            from '../app.module';
import { AuthModule } from '../auth/auth.module';
import { HomeModule } from '../home/home.module';
import { AuthRouterModule } from '../auth/auth.router.module';
import { log } from 'util';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


let fixture,header;    

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
        expect(el.textContent.trim()).toBe("Trip Organizer");
        
    }));

    it("Brand name should not be visible only for pages other than home" , async(() => {
        header.currentUrl = "/city";
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css(".navbar-brand"));
        const el = de.nativeElement;
        expect(el.textContent.trim()).toBe("");
        
    }));
  
  });