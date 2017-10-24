import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPlaceComponent } from './add-new-place.component';

describe('AddNewPlaceComponent', () => {
  let component: AddNewPlaceComponent;
  let fixture: ComponentFixture<AddNewPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
