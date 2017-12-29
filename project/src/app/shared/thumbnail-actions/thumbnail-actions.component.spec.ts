import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailActionsComponent } from './thumbnail-actions.component';

describe('ThumbnailActionsComponent', () => {
  let component: ThumbnailActionsComponent;
  let fixture: ComponentFixture<ThumbnailActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbnailActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
