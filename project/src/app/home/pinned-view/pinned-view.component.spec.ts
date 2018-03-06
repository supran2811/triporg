import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule, Store } from '@ngrx/store/';
import { By } from '@angular/platform-browser';

import { AppModule } from '../../app.module';
import { PinnedViewComponent } from './pinned-view.component';
import * as fromApp from '../../store/app.reducer';
import * as PinnedViewActions from './store/pinnedview.action';
import { City } from '../../models/city.model';
import { Place } from '../../models/place.model';

let fixture , pinnedView;
let store:Store<fromApp.AppState>;


describe("PinnedViewComponent" , () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:[
                AppModule
            ],
            providers:[{provide: APP_BASE_HREF, useValue: '/'}]
        }).compileComponents();

        fixture  = TestBed.createComponent(PinnedViewComponent);
        pinnedView = fixture.debugElement.componentInstance;
    }));

    it("It should create pinnedview" , () => {
        expect(pinnedView).toBeTruthy();
    });

    it("Pinned view item should be equal to pinned cities length" , async(() => {
        fixture.detectChanges();
        const cities = [new City("1","Test City 1",1.0,1.0, []) , new City("2","Test City 2",2.0,2.0) ];
        store = fixture.debugElement.injector.get( Store );
        store.dispatch(new PinnedViewActions.SetPinnedCities(cities));
        fixture.detectChanges();
        const de = fixture.debugElement.queryAll(By.css(".thumbnail"));
        expect(de.length).toEqual(cities.length);
    }));

    it("Pinned view item should be null when pinned cities are empty" , async(() => {
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css(".thumbnail"));
        expect(de).toBeNull();
    }));
})