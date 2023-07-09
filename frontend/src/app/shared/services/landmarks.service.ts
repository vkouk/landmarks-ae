import { Injectable } from '@angular/core'

import * as Parse from 'parse'

import { ILandmark, ILandmarkInput } from '../interfaces/landmark'
import { UserService } from './user.service'

@Injectable({
  providedIn: 'root'
})
export class LandmarksService {
  constructor(private usersService: UserService) {}

  async fetchLandmarks(searchInput?: string | null): Promise<ILandmark[]> {
    return await Parse.Cloud.run('fetchLandmarks', { search: searchInput })
  }

  async fetchLandmark(title: string): Promise<ILandmark> {
    return await Parse.Cloud.run('fetchLandmark', { title })
  }

  async updateLandmark(
    id: string,
    updatedData: ILandmarkInput
  ): Promise<ILandmark> {
    return await Parse.Cloud.run(
      'updateLandmark',
      { id, updatedData },
      { sessionToken: this.usersService.currentUser()?.getSessionToken() }
    )
  }
}
