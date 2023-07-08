import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser'

import { ILandmark } from '../../shared/interfaces/landmark'
import { ParseServerService } from '../../shared/services/parse-server/parse-server.service'

@Component({
  selector: 'app-landmark',
  templateUrl: './landmark.component.html'
})
export class LandmarkComponent {
  landmark: ILandmark | null = null
  error: string | null = null

  constructor(
    private sanitizer: DomSanitizer,
    private parseService: ParseServerService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.route.params.subscribe(async (params) => {
      try {
        this.landmark = await this.parseService.fetchLandmark(params['title'])
      } catch (error: any) {
        this.error = error.message
      }
    })
  }

  get googleMapsSrc(): string | null {
    return this.landmark
      ? (this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://maps.google.com/maps?q=${this.landmark.attributes.location[1]},${this.landmark.attributes.location[0]}&z=16&output=embed`
        ) as string)
      : null
  }
}
