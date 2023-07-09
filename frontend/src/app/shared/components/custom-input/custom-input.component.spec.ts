import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, ReactiveFormsModule } from '@angular/forms'

import { CustomInputComponent } from './custom-input.component'

describe('CustomInputComponent', () => {
  let component: CustomInputComponent
  let fixture: ComponentFixture<CustomInputComponent>
  let formControl: FormControl

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CustomInputComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(CustomInputComponent)
    component = fixture.componentInstance
    formControl = new FormControl()

    component.control = formControl

    fixture.detectChanges()
  })

  it('should update value', () => {
    formControl.reset('')

    const updatedValue = 'New value'
    const inputEl = fixture.nativeElement.querySelector('input')

    // Assert default value
    expect(component.control?.value).toEqual('')

    // Set new value
    inputEl.value = updatedValue
    inputEl.dispatchEvent(new Event('input'))

    // Assert new value
    expect(component.control?.value).toEqual(updatedValue)
  })
})
