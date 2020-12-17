import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutseiteComponent } from './aboutseite/aboutseite.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { ErrorComponent } from './error/error.component';

import { MeditationComponent } from './meditation/meditation.component';
import { QuestionsComponent } from './questions/questions.component';

import { StartseiteComponent } from './startseite/startseite.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'start', component: StartseiteComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutseiteComponent, canActivate: [AuthGuard] },
  {
    path: 'questions',
    component: QuestionsComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'meditation',
    component: MeditationComponent,canActivate: [AuthGuard]

  },
  { path: 'error', component: ErrorComponent },
  { path: '**', component: ErrorComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


//TODO: canactivate einschalten
