import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule, Store } from '@ngrx/store/';
import { By } from '@angular/platform-browser';

import { PlaceModule } from '../place.module';
import { PlaceListComponent } from './place-list.component';
import { AppModule } from '../../app.module';
import * as fromPlaceReducer from '../store/place.reducer';
import * as PlaceActions from '../store/place.action';
import { City } from '../../models/city.model';
import { Place } from '../../models/place.model';

let fixture , placeListView
let store: Store<fromPlaceReducer.FeatureState>

describe("PlaceListComponent" , () => {
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

    it("Test if number of place items are same as number of pinned item" , async(() =>{
        store = fixture.debugElement.injector.get(Store);
        const placelist = [new Place('test-place-id1',1.2,1.3,'test-place-name1','http://placeurl')];

        const city = new City("test-city-id","test-city-name",1.2,1.3,placelist);
        store.dispatch(new PlaceActions.SetCity(city));

        fixture.detectChanges();
        const de = fixture.debugElement.queryAll(By.css('app-place-item'));
        expect(de.length).toEqual(1);
    }));

    it("Test if empty section is shown when pinned item is empty",async(() =>{
        store = fixture.debugElement.injector.get(Store);
        const placeList = [];
        const city = new City("test-city-id","test-city-name",1.2,1.3,placeList);
        store.dispatch(new PlaceActions.SetCity(city));
        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('.emptysection'));
        expect(de).toBeTruthy();
    }));
});