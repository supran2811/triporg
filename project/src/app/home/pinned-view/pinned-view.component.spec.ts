import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule } from '@ngrx/store/';
import { AppModule } from '../../app.module';
import { PinnedViewComponent } from './pinned-view.component';

let fixture , pinnedView;

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
})