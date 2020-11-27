import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';



import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { AboutseiteComponent } from './aboutseite/aboutseite.component';
import { CardComponent } from './questions/card/card.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartseiteComponent,
    AboutseiteComponent,
    CardComponent,
    QuestionsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }