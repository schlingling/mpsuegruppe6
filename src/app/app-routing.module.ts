import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutseiteComponent } from './aboutseite/aboutseite.component';
import { CardComponent } from './questions/card/card.component';
import { QuestionsComponent } from './questions/questions.component';

import { StartseiteComponent } from './startseite/startseite.component';

const routes: Routes = [
  {path:'',component: StartseiteComponent},
  {path:'about', component:AboutseiteComponent},
  {path:'questions', component:QuestionsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
