import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import { debounceTime } from 'rxjs'

import { ILandmark } from '../../shared/interfaces/landmark'
import { LandmarksService } from '../../shared/services/landmarks.service'

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html'
})
export class LandmarksComponent {
  landmarks: ILandmark[] = []
  searchInput = new FormControl('')

  selectedLandmark: ILandmark | null = null

  constructor(private landmarksService: LandmarksService) {}

  async ngOnInit() {
    // Initial fetch of landmarks
    await this._updateLandmarks()

    this.searchInput.valueChanges
      .pipe(debounceTime(300))
      .subscribe(async (value) => await this._updateLandmarks(value))
  }

  async _updateLandmarks(searchInput?: string | null) {
    this.landmarks = await this.landmarksService.fetchLandmarks(searchInput)
  }

  openImageModal(landmark: ILandmark) {
    this.selectedLandmark = landmark
  }

  closeImageModal() {
    this.selectedLandmark = null
  }
}
