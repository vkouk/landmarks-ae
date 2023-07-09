import { Component, Input } from '@angular/core'
import { AbstractControl, FormControl } from '@angular/forms'

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html'
})
export class CustomInputComponent {
  @Input() control: FormControl | AbstractControl | null = new FormControl('')
  @Input() id: string = ''
  @Input() placeholder: string = ''
  @Input() type: string = 'text'
  @Input() required: boolean = true

  get formControl(): FormControl {
    return this.control as FormControl
  }
}
