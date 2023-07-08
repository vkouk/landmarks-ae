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
}
