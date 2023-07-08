import { Injectable } from '@angular/core'

import * as Parse from 'parse'

import { ILandmark } from '../interfaces/landmark'

@Injectable({
  providedIn: 'root'
})
export class LandmarksService {
  async fetchLandmarks(searchInput?: string | null): Promise<ILandmark[]> {
    return await Parse.Cloud.run('fetchLandmarks', { search: searchInput })
  }

  async fetchLandmark(title: string): Promise<ILandmark> {
    return await Parse.Cloud.run('fetchLandmark', { title })
  }
}
