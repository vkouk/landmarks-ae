import { Component } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'

import { ParseServerService } from './shared/services/parse-server/parse-server.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  currentUser: Parse.User<Parse.Attributes> | undefined

  constructor(
    private parseService: ParseServerService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      // Assign user once on init
      if (event instanceof NavigationEnd && !this.currentUser) {
        this.currentUser = this.parseService.currentUser()
      }
    })
  }

  async logoutUser() {
    await this.parseService.logoutUser()

    this.currentUser = undefined
  }
}
