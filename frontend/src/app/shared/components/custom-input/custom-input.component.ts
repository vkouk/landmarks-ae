import { Component, Input } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html'
})
export class CustomInputComponent {
  @Input() control: FormControl = new FormControl('')
  @Input() id: string = ''
  @Input() placeholder: string = ''
  @Input() type: string = 'text'
  @Input() required: boolean = true
}
