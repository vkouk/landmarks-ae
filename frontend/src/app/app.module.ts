import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { LandmarksComponent } from './pages/landmarks/landmarks.component'
import { LoginComponent } from './pages/login/login.component'
import { ReactiveFormsModule } from '@angular/forms'

const routes: Routes = [
  { path: '', component: LandmarksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'landmark/:title', component: LoginComponent }
]

@NgModule({
  declarations: [AppComponent, LandmarksComponent, LoginComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
