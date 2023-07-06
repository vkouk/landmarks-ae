import { ComponentFixture, TestBed } from '@angular/core/testing'

import { LandmarksComponent } from './landmarks.component'

describe('LandmarksComponent', () => {
  let component: LandmarksComponent
  let fixture: ComponentFixture<LandmarksComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LandmarksComponent]
    })
    fixture = TestBed.createComponent(LandmarksComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
