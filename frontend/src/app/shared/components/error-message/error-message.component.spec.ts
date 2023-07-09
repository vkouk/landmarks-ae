import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ErrorMessageComponent } from './error-message.component'

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent
  let fixture: ComponentFixture<ErrorMessageComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorMessageComponent]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should display error when there is one', () => {
    component.error = 'Validation Error'
    fixture.detectChanges()

    const errorMessageEl = fixture.nativeElement.querySelector('.error-message')

    expect(errorMessageEl).toBeTruthy()
    expect(errorMessageEl.textContent).toEqual('Validation Error')
  })

  it('should not display error when error is null or empty', () => {
    component.error = ''
    fixture.detectChanges()

    const errorMessageEl = fixture.nativeElement.querySelector('.error-message')

    expect(errorMessageEl).toBeFalsy()
  })
})
