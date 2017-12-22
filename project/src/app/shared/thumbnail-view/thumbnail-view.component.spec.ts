import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThumbnailViewComponent } from './thumbnail-view.component';

describe('ThumbnailViewComponent', () => {
  let component: ThumbnailViewComponent;
  let fixture: ComponentFixture<ThumbnailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThumbnailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThumbnailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
