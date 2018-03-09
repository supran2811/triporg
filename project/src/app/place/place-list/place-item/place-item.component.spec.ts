import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule, Store } from '@ngrx/store/';
import { By } from '@angular/platform-browser';

import { AppModule } from '../../../app.module';
import { PlaceModule } from '../../place.module';
import * as fromPlaceReducer from '../../store/place.reducer';
import * as PlaceActions from '../../store/place.action';
import { PlaceItemComponent } from './place-item.component';
import { Place } from '../../../models/place.model';
import { City } from '../../../models/city.model';


let store:Store<fromPlaceReducer.FeatureState>;
let fixture,placeItem;

fdescribe('PlaceItemComponent',() => {
    beforeEach(async(() =>{
        TestBed.configureTestingModule({
            imports:[AppModule,PlaceModule],
            providers:[{provide: APP_BASE_HREF, useValue: '/'}]
        }).compileComponents();
        fixture  = TestBed.createComponent(PlaceItemComponent);
        placeItem = fixture.debugElement.componentInstance;

    }));

    it("Test is placeItem is truthy",async(() =>{
        expect(placeItem).toBeTruthy();
    }));
})