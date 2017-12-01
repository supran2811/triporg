import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedViewComponent } from './pinned-view.component';

describe('PinnedViewComponent', () => {
  let component: PinnedViewComponent;
  let fixture: ComponentFixture<PinnedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinnedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
