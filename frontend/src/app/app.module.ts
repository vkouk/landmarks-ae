import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { LandmarksComponent } from './pages/landmarks/landmarks.component'
import { LandmarkComponent } from './pages/landmark/landmark.component'

const routes: Routes = [
  { path: '', component: LandmarksComponent },
  { path: 'landmark/:title', component: LandmarkComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
]

@NgModule({
  declarations: [AppComponent, LandmarksComponent, LandmarkComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
