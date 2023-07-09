import { Component } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { DomSanitizer } from '@angular/platform-browser'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ViewportScroller } from '@angular/common'

import { ILandmark } from '../../shared/interfaces/landmark'
import { LandmarksService } from '../../shared/services/landmarks.service'

@Component({
  selector: 'app-landmark',
  templateUrl: './landmark.component.html'
})
export class LandmarkComponent {
  landmark: ILandmark | null = null
  error: string | null = null
  isEditMode: boolean = false

  landmarkForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    short_info: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private scroller: ViewportScroller,
    private landmarksService: LandmarksService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.isEditMode = params['editMode'] === 'true'
    })

    this.route.params.subscribe(async (params) => {
      try {
        this.landmark = await this.landmarksService.fetchLandmark(
          params['title']
        )

        this._updateLandmarkForm()
      } catch (error: any) {
        this.error = error.message
      }
    })
  }

  onPhotoChange(event: Event) {
    const fileReader = new FileReader()
    const eventTarget = event.target as HTMLInputElement

    if (eventTarget.files && eventTarget.files.length > 0) {
      const file = eventTarget.files[0]

      fileReader.readAsDataURL(file)

      fileReader.onload = async (e: any) => {
        try {
          this.error = null

          const { id: landmarkId, attributes } = this.landmark as ILandmark

          const updatedLandmark = await this.landmarksService.updatePhoto(
            landmarkId,
            e.target.result,
            file.name,
            file.type
          )

          attributes.photo_thumb = updatedLandmark.attributes.photo_thumb
        } catch (error: any) {
          this.error = error.message
        }
      }
    }
  }

  async toggleEditMode() {
    this.error = null
    this.isEditMode = !this.isEditMode

    this._updateLandmarkForm()

    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { editMode: this.isEditMode },
      queryParamsHandling: 'merge'
    })
  }

  async onLandmarkUpdate() {
    const { id: landmarkId } = this.landmark as ILandmark
    const formData = this.landmarkForm.value

    try {
      this.error = null

      const updatedLandmark = await this.landmarksService.updateLandmark(
        landmarkId,
        formData
      )

      await this.router.navigate(['landmark', updatedLandmark.attributes.title])
    } catch (error: any) {
      this.error = error.message
    }
  }

  _updateLandmarkForm() {
    const landmark = this.landmark as ILandmark

    // Reset form status (ex dirty) & values
    this.landmarkForm.reset({
      title: landmark.attributes.title,
      short_info: landmark.attributes.short_info,
      description: landmark.attributes.description
    })
  }

  get updateButtonDisabled(): boolean {
    return !this.landmarkForm.valid || !this.landmarkForm.dirty
  }

  get googleMapsSrc(): string | null {
    return this.landmark
      ? (this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://maps.google.com/maps?q=${this.landmark.attributes.location?.[1]},${this.landmark.attributes.location?.[0]}&z=16&output=embed`
        ) as string)
      : null
  }
}
