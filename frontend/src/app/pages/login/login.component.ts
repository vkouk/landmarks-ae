import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'

import { ParseServerService } from '../../shared/services/parse-server/parse-server.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  error: string | null = null

  usernameControl = new FormControl('')
  passwordControl = new FormControl('')

  constructor(
    private parseService: ParseServerService,
    private router: Router
  ) {}

  async loginUser() {
    try {
      await this.parseService.loginUser(
        this.usernameControl.value as string,
        this.passwordControl.value as string
      )

      await this.router.navigate(['/'])
    } catch (error: any) {
      this.error = error.message
    }
  }

  get loginButtonDisabled(): boolean {
    return (
      this.usernameControl.value === '' || this.passwordControl.value === ''
    )
  }
}
