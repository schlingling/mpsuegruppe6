import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from './question';
import data from './questions.json';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Rating } from './interfaces/rating';




@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private router: Router, private firestore: AngularFirestore) { }

  getDocument(document: String) {
    return this.firestore.collection(''+document).snapshotChanges();
  }

  setDocument(document: string, text: any){
    this.firestore.collection(document).add(text)
  }


  getRatings(){
    return this.firestore.collection('ratings').snapshotChanges();

  }



}
