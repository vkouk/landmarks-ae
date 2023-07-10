import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'

import { UserService } from '../../shared/services/user.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  usernameControl = new FormControl('')
  passwordControl = new FormControl('')

  constructor(private usersService: UserService) {}

  async loginUser() {
    await this.usersService.loginUser(
      this.usernameControl.value as string,
      this.passwordControl.value as string
    )
  }

  get loginButtonDisabled(): boolean {
    return (
      this.usernameControl.value === '' ||
      this.passwordControl.value === '' ||
      this.usersService.loading
    )
  }

  get error() {
    return this.usersService.fetchError
  }
}
