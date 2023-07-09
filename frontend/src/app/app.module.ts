import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { LandmarksComponent } from './pages/landmarks/landmarks.component'
import { LandmarkComponent } from './pages/landmark/landmark.component'
import { LoginComponent } from './pages/login/login.component'

import { CustomInputComponent } from './shared/components/custom-input/custom-input.component'
import { EditIconComponent } from './shared/components/edit-icon/edit-icon.component'
import { ErrorMessageComponent } from './shared/components/error-message/error-message.component'

const routes: Routes = [
  { path: '', component: LandmarksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'landmark/:title', component: LandmarkComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    LandmarksComponent,
    LandmarkComponent,
    LoginComponent,
    CustomInputComponent,
    EditIconComponent,
    ErrorMessageComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes), ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
