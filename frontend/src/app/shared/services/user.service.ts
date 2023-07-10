import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import * as Parse from 'parse'

import { PromiseCallback } from '../types/promise'

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: Parse.User<Parse.Attributes> | undefined | null

  fetchError: string | null = null
  loading: boolean = false

  constructor(private router: Router) {}

  async loginUser(username: string, password: string) {
    return await this._handlePromise(
      async () => {
        this.currentUser = await Parse.User.logIn(username, password)

        await this.router.navigate(['/'])
      },
      (error: any) => {
        this.fetchError = error.message

        return null
      }
    )
  }

  async logoutUser() {
    return await this._handlePromise(
      async () => {
        await Parse.User.logOut()
        this.currentUser = null
      },
      (error: any) => {
        this.fetchError = error.message

        return null
      }
    )
  }

  initUser() {
    this.currentUser = Parse.User.current()
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
