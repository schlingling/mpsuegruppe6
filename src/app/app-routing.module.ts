import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutseiteComponent } from './aboutseite/aboutseite.component';
import { MeditationComponent } from './meditation/meditation.component';
import { QuestionsComponent } from './questions/questions.component';

import { StartseiteComponent } from './startseite/startseite.component';

const routes: Routes = [
  { path: '', component: StartseiteComponent },
  { path: 'about', component: AboutseiteComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'meditation', component: MeditationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
