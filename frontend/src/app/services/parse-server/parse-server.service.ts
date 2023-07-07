import { Injectable } from '@angular/core'

import * as Parse from 'parse'
import environment from '../../../../environments/environment'
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

  async fetchLandmarks(): Promise<ILandmark[]> {
    return await Parse.Cloud.run('fetchLandmarks')
  }

  async fetchLandmark(id: string): Promise<ILandmark> {
    return await Parse.Cloud.run('fetchLandmark', { id })
  }
}
