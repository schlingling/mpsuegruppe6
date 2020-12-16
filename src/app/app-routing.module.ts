import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutseiteComponent } from './aboutseite/aboutseite.component';
import { AdminComponent } from './admin/admin.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { MeditationComponent } from './meditation/meditation.component';
import { QuestionsComponent } from './questions/questions.component';

import { StartseiteComponent } from './startseite/startseite.component';

const routes: Routes = [
  { path: '', component: StartseiteComponent },
  { path: 'about', component: AboutseiteComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'meditation', component: MeditationComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'verify-email', component: VerifyEmailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
