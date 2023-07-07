import { Component } from '@angular/core'

import { ParseServerService } from '../../services/parse-server/parse-server.service'
import { ILandmark } from '../../interfaces/landmark'

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html'
})
export class LandmarksComponent {
  landmarks: ILandmark[] = []

  constructor(private parseService: ParseServerService) {}

  async ngOnInit() {
    this.landmarks = await this.parseService.fetchLandmarks()
  }
}
