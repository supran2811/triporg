import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedViewItemComponent } from './pinned-view-item.component';

describe('PinnedViewItemComponent', () => {
  let component: PinnedViewItemComponent;
  let fixture: ComponentFixture<PinnedViewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinnedViewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnedViewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
