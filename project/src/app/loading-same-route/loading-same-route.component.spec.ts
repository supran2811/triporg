import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSameRouteComponent } from './loading-same-route.component';

describe('LoadingSameRouteComponent', () => {
  let component: LoadingSameRouteComponent;
  let fixture: ComponentFixture<LoadingSameRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingSameRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSameRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
