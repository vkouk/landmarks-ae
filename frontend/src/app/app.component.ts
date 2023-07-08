import { Component } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'

import { ParseServerService } from './shared/services/parse-server.service'
import { UserService } from './shared/services/user.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentUser: Parse.User<Parse.Attributes> | undefined

  constructor(
    private parseService: ParseServerService,
    private usersService: UserService,
    private router: Router
  ) {
    this.parseService.initializeParse()
  }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      // Assign user once on init
      if (event instanceof NavigationEnd && !this.currentUser) {
        this.currentUser = this.usersService.currentUser()
      }
    })
  }

  async logoutUser() {
    await this.usersService.logoutUser()

    this.currentUser = undefined
  }
}
