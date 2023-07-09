import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'

import { LandmarksComponent } from './landmarks.component'
import { LandmarksService } from '../../shared/services/landmarks.service'
import { CustomInputComponent } from '../../shared/components/custom-input/custom-input.component'
import { RouterTestingModule } from '@angular/router/testing'

const mockLandmarks = [
  {
    id: '1',
    attributes: { title: 'Landmark 1', photo: '', photo_thumb: '' }
  },
  {
    id: '2',
    attributes: { title: 'Landmark 2', photo: '', photo_thumb: '' }
  }
]

describe('LandmarksComponent', () => {
  let component: LandmarksComponent
  let fixture: ComponentFixture<LandmarksComponent>
  let landmarksServiceSpy: jasmine.SpyObj<LandmarksService>

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('LandmarksService', ['fetchLandmarks'])

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [LandmarksComponent, CustomInputComponent],
      providers: [{ provide: LandmarksService, useValue: spy }]
    }).compileComponents()

    landmarksServiceSpy = TestBed.inject(
      LandmarksService
    ) as jasmine.SpyObj<LandmarksService>
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LandmarksComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should fetch landmarks', async () => {
    landmarksServiceSpy.fetchLandmarks.and.returnValue(
      Promise.resolve(mockLandmarks)
    )

    await component.ngOnInit()

    expect(landmarksServiceSpy.fetchLandmarks).toHaveBeenCalled()
    expect(component.landmarks).toEqual(mockLandmarks)
  })

  it('should fetch landmarks when search input changes', async () => {
    const inputEl = fixture.nativeElement.querySelector('input')

    landmarksServiceSpy.fetchLandmarks.and.returnValue(
      Promise.resolve(mockLandmarks)
    )

    await component.ngOnInit()

    expect(landmarksServiceSpy.fetchLandmarks).toHaveBeenCalled()
    expect(component.landmarks).toEqual(mockLandmarks)

    component.searchInput.setValue('landmark 1')

    landmarksServiceSpy.fetchLandmarks.and.returnValue(
      Promise.resolve([mockLandmarks[0]])
    )

    await component.ngOnInit()
    await fixture.whenStable()
    fixture.detectChanges()

    expect(inputEl.value).toEqual('landmark 1')
    expect(landmarksServiceSpy.fetchLandmarks).toHaveBeenCalled()
    expect(component.landmarks).toEqual([mockLandmarks[0]])
  })

  it('should open and close the image modal', () => {
    const mockLandmark = mockLandmarks[0]

    component.openImageModal(mockLandmark)
    expect(component.selectedLandmark).toEqual(mockLandmark)

    component.closeImageModal()
    expect(component.selectedLandmark).toBeNull()
  })
})
