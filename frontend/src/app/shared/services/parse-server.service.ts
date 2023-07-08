import { Injectable } from '@angular/core'

import * as Parse from 'parse'

import environment from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ParseServerService {
  initializeParse() {
    Parse.initialize(environment.APP_ID)
    Parse.CoreManager.set('SERVER_URL', environment.SERVER_URL)
  }
}
