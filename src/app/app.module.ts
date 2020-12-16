import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {  HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { AboutseiteComponent } from './aboutseite/aboutseite.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsService } from './shared/questions.service';
import { MeditationComponent } from './meditation/meditation.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartseiteComponent,
    AboutseiteComponent,
    QuestionsComponent,
    MeditationComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    AdminComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HammerModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [QuestionsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
