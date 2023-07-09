import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild
} from '@angular/core'

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html'
})
export class ErrorMessageComponent {
  @Input() error: string | null = null
  @Input() scrollTo: boolean = false

  @ViewChild('errorMessage', { static: false }) errorMessageEl!: ElementRef

  ngOnChanges(changes: SimpleChanges) {
    const errorChange = changes['error']

    if (errorChange.currentValue !== null && this.scrollTo) {
      // Execute scroll to error message after message is visible
      setTimeout(
        () =>
          this.errorMessageEl.nativeElement.scrollIntoView({
            behavior: 'smooth'
          }),
        0
      )
    }
  }
}
