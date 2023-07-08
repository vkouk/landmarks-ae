import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { Router } from '@angular/router'

import { UserService } from '../../shared/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  error: string | null = null

  usernameControl = new FormControl('')
  passwordControl = new FormControl('')

  constructor(
    private usersService: UserService,
    private router: Router
  ) {}

  async loginUser() {
    try {
      await this.usersService.loginUser(
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
