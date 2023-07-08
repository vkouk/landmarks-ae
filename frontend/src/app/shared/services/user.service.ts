import { Injectable } from '@angular/core'

import * as Parse from 'parse'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  async loginUser(username: string, password: string) {
    return await Parse.User.logIn(username, password)
  }

  async logoutUser() {
    return await Parse.User.logOut()
  }

  currentUser() {
    return Parse.User.current()
  }
}
