import { Component } from '@angular/core'

import { ParseServerService } from './shared/services/parse-server.service'
import { UserService } from './shared/services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private parseService: ParseServerService,
    private usersService: UserService
  ) {
    this.parseService.initializeParse()
  }

  ngOnInit() {
    this.usersService.initUser()
  }

  async logoutUser() {
    await this.usersService.logoutUser()
  }

  get currentUser() {
    return this.usersService.currentUser
  }
}
