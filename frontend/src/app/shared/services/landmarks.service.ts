import { Injectable } from '@angular/core'

import * as Parse from 'parse'

import { ILandmark, ILandmarkInput } from '../interfaces/landmark'
import { UserService } from './user.service'

type PromiseCallback<T> = () => Promise<T>

@Injectable({
  providedIn: 'root'
})
export class LandmarksService {
  fetchError: string | null = null
  loading: boolean = false

  constructor(private usersService: UserService) {}

  async fetchLandmarks(searchInput?: string | null): Promise<ILandmark[]> {
    return await this._handlePromise<ILandmark[]>(
      async (): Promise<ILandmark[]> =>
        await Parse.Cloud.run('fetchLandmarks', { search: searchInput }),
      (error: any) => {
        this.fetchError = error.message

        return []
      }
    )
  }

  async fetchLandmark(title: string): Promise<ILandmark | null> {
    return await this._handlePromise<ILandmark>(
      async (): Promise<ILandmark> =>
        await Parse.Cloud.run('fetchLandmark', { title }),
      (error: any) => {
        this.fetchError = error.message

        return null
      }
    )
  }

  async updateLandmark(
    id: string,
    updatedData: ILandmarkInput
  ): Promise<ILandmark | null> {
    return await this._handlePromise<ILandmark>(
      async (): Promise<ILandmark> =>
        await Parse.Cloud.run(
          'updateLandmark',
          { id, updatedData },
          { sessionToken: this.usersService.currentUser()?.getSessionToken() }
        ),
      (error: any) => {
        this.fetchError = error.message

        return null
      }
    )
  }

  async updatePhoto(
    id: string,
    image: string,
    name: string,
    type: string
  ): Promise<ILandmark | null> {
    return await this._handlePromise<ILandmark>(
      async (): Promise<ILandmark> =>
        await Parse.Cloud.run(
          'updatePhoto',
          { id, image, name, type },
          { sessionToken: this.usersService.currentUser()?.getSessionToken() }
        ),
      (error: any) => {
        this.fetchError = error.message

        return null
      }
    )
  }

  clearError() {
    this.fetchError = null
  }

  async _handlePromise<T>(
    onCompleted: PromiseCallback<T>,
    onError: Function
  ): Promise<T> {
    this.fetchError = null
    this.loading = true

    try {
      return await onCompleted()
    } catch (error: any) {
      return onError(error)
    } finally {
      this.loading = false
    }
  }
}
