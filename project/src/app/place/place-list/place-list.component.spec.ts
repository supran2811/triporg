import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule, Store } from '@ngrx/store/';
import { By } from '@angular/platform-browser';

import { PlaceModule } from '../place.module';
import { PlaceListComponent } from './place-list.component';
import { AppModule } from '../../app.module';


let fixture , placeListView

fdescribe("PlaceListComponent" , () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:[AppModule , PlaceModule],
            providers:[{provide: APP_BASE_HREF, useValue: '/'}]
        }).compileComponents();

        fixture = TestBed.createComponent(PlaceListComponent);
        placeListView = fixture.debugElement.componentInstance;

    }));

    it("Test if place list component is created" , async(() => {
        expect(placeListView).toBeTruthy();
    }));

    // it("Empty message should be displayed when saved places are not present", async(() => {

    // }));
});