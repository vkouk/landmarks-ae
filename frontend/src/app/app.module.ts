import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'
import { AppComponent } from './app.component'
import { LandmarksComponent } from './pages/landmarks/landmarks.component'

const routes: Routes = [{ path: '', component: LandmarksComponent }]

@NgModule({
  declarations: [AppComponent, LandmarksComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
