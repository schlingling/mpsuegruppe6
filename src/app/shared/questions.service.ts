import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from './question';
import data from './questions.json';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { TextToSave } from './text';


@Injectable({
  providedIn: 'root',
})
export class QuestionsService {

  public questions_categories: String[] = []
  public test: String[] = []



  public questions_categories: String[] = []

  constructor(private router: Router, private firestore: AngularFirestore) {}



  setTexts(text: TextToSave){
    this.firestore.collection('texts').add(text)
  }

  getCategories(){
    return this.questions_categories;
  }

  setCategotires(categories: String[]){
    this.questions_categories = categories.slice()
  }

  //GET
  getQuestions(document: String) {
    return this.firestore.collection(''+document).snapshotChanges();
  }

  //POST
  createQuestion(question: Question) {
    return this.firestore.collection('questions').add(question);
  }

  //UPDATE
  updateQuestion(question: Question) {
    delete question.id;
    this.firestore.doc('questions/' + question.id).update(question);
  }

  //DELETE
  deleteQuestion(questionID: string) {
    this.firestore.doc('questions/' + questionID).delete();
  }


  updateFreeQuestions(event: string) {}

  getFirestore(){
    return this.firestore;
  }


  getCategories(){
    console.log(this.questions_categories)
    return this.questions_categories.slice();
  }

  setCategories(categories: String[]){
    this.questions_categories = categories
    console.log(categories)
  }


}
