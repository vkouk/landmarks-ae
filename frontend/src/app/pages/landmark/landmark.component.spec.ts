import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandmarkComponent } from './landmark.component';

describe('LandmarkComponent', () => {
  let component: LandmarkComponent;
  let fixture: ComponentFixture<LandmarkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandmarkComponent]
    });
    fixture = TestBed.createComponent(LandmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
