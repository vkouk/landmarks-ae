import { Injectable } from '@angular/core'

import * as Parse from 'parse'
import environment from '../../../../../environments/environment'
import { ILandmark } from '../../interfaces/landmark'

@Injectable({
  providedIn: 'root'
})
export class ParseServerService {
  private readonly serverURL = environment.SERVER_URL

  constructor() {
    Parse.initialize(environment.APP_ID)
    // @ts-ignore
    Parse.serverURL = this.serverURL
  }

  async fetchLandmarks(searchInput?: string | null): Promise<ILandmark[]> {
    return await Parse.Cloud.run('fetchLandmarks', { search: searchInput })
  }

  async fetchLandmark(title: string): Promise<ILandmark> {
    return await Parse.Cloud.run('fetchLandmark', { title })
  }

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
