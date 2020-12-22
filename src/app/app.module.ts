import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {  HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';




import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { AboutseiteComponent } from './aboutseite/aboutseite.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsService } from './shared/questions.service';
import { MeditationComponent } from './meditation/meditation.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ErrorComponent } from './error/error.component';
import { DocumentService } from './shared/document.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartseiteComponent,
    AboutseiteComponent,
    QuestionsComponent,
    MeditationComponent,
    LoginComponent,
    ErrorComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HammerModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

  ],
  providers: [QuestionsService,AuthGuard, DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
