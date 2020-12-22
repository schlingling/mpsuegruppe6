import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from './question';
import data from './questions.json';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor() { }
}
