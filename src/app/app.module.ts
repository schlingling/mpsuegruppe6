import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StartseiteComponent } from './startseite/startseite.component';
import { AboutseiteComponent } from './aboutseite/aboutseite.component';
import { FrageComponent } from './frage/frage.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartseiteComponent,
    AboutseiteComponent,
    FrageComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
