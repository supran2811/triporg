import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewInterniryComponent } from './add-new-interniry.component';

describe('AddNewInterniryComponent', () => {
  let component: AddNewInterniryComponent;
  let fixture: ComponentFixture<AddNewInterniryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewInterniryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewInterniryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
