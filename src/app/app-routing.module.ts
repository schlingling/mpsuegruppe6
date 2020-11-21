import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutseiteComponent } from './aboutseite/aboutseite.component';
import { FrageComponent } from './frage/frage.component';
import { StartseiteComponent } from './startseite/startseite.component';

const routes: Routes = [
  {path:'',component: StartseiteComponent},
  {path:'about', component:AboutseiteComponent},
  {path:'frage', component:FrageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
