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
      this.landmark = await this.landmarksService.fetchLandmark(params['title'])

      this._updateLandmarkForm()
    })
  }

  onPhotoChange(event: Event) {
    const fileReader = new FileReader()
    const eventTarget = event.target as HTMLInputElement

    if (eventTarget.files && eventTarget.files.length > 0) {
      this.landmarksService.clearError()

      const file = eventTarget.files[0]

      fileReader.readAsDataURL(file)

      fileReader.onload = async (e: any) => {
        const { id: landmarkId, attributes } = this.landmark as ILandmark

        const updatedLandmark = await this.landmarksService.updatePhoto(
          landmarkId,
          e.target.result,
          file.name,
          file.type
        )

        if (updatedLandmark) {
          attributes.photo_thumb = updatedLandmark.attributes.photo_thumb
        }
      }
    }
  }

  async toggleEditMode() {
    this.landmarksService.clearError()
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

    this.landmarksService.clearError()

    const updatedLandmark = await this.landmarksService.updateLandmark(
      landmarkId,
      formData
    )

    if (updatedLandmark) {
      await this.router.navigate(['landmark', updatedLandmark.attributes.title])
    }
  }

  _updateLandmarkForm() {
    if (this.landmark) {
      // Reset form status (ex dirty) & values
      this.landmarkForm.reset({
        title: this.landmark.attributes.title,
        short_info: this.landmark.attributes.short_info,
        description: this.landmark.attributes.description
      })
    }
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

  get isLoading() {
    return this.landmarksService.loading
  }

  get error() {
    return this.landmarksService.fetchError
  }
}
