import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { StoreModule } from '@ngrx/store/';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { AppRouterModule } from './app.router.module';
import { HomeModule } from './home/home.module';
import { globalReducer } from './store/app.reducer';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeaderComponent
      ],
      imports:[
        AppRouterModule,
        SharedModule,
        HomeModule,
        StoreModule.forRoot(globalReducer)
      ],
      providers:[{provide: APP_BASE_HREF, useValue: '/'}]
    }).compileComponents();
  }));


  it('should create the app', async(() => {
    
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));


});
