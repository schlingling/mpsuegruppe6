import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { ReflectionComponent } from './reflection/reflection.component';
import { RatingComponent } from './rating/rating.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
    ReflectionComponent,
    RatingComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HammerModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgxSliderModule,
    NgbModule,

  ],
  providers: [QuestionsService,AuthGuard, DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
