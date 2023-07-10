import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'

import { LandmarkComponent } from './landmark.component'

import { LandmarksService } from '../../shared/services/landmarks.service'
import { ErrorMessageComponent } from '../../shared/components/error-message/error-message.component'
import { EditIconComponent } from '../../shared/components/edit-icon/edit-icon.component'

const mockLandmark = {
  id: '1',
  attributes: { title: 'Landmark 1', photo: '', photo_thumb: '' }
}

describe('LandmarkComponent', () => {
  let component: LandmarkComponent
  let fixture: ComponentFixture<LandmarkComponent>
  let landmarksServiceSpy: jasmine.SpyObj<LandmarksService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LandmarksService', ['fetchLandmark'])

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [
        LandmarkComponent,
        EditIconComponent,
        ErrorMessageComponent
      ],
      providers: [{ provide: LandmarksService, useValue: spy }]
    }).compileComponents()

    landmarksServiceSpy = TestBed.inject(
      LandmarksService
    ) as jasmine.SpyObj<LandmarksService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarkComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should open and close the image modal', async () => {
    landmarksServiceSpy.fetchLandmark.and.returnValue(
      Promise.resolve(mockLandmark)
    )

    await component.ngOnInit()
    fixture.detectChanges()

    expect(
      fixture.nativeElement.querySelector('h2').textContent.trim()
    ).toEqual(mockLandmark.attributes.title)
    expect(fixture.nativeElement.querySelector('.photo-popup')).toBeNull()

    component.togglePhotoPopup()

    fixture.detectChanges()

    expect(fixture.nativeElement.querySelector('.photo-popup')).toBeTruthy()
  })
})
