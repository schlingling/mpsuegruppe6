import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Question } from './question';
import data from './questions.json';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private questions: Question[] = data;
  private questions2: Question[] = [];
  private ques : Question;

  private freeQuestions: Question[] = []; //questions that are ready to display, becaue not choosen already
  private choosenQuestions: Question[] = []; //questions to reflect on later
  private index: number = 0;

  public indexChanged = new EventEmitter<number>();
  public freeQuestionChanged = new EventEmitter<Question[]>();
  public choosenQuestionChanged = new EventEmitter<Question[]>();

  private questionsUpdated = new Subject(); //später benutzen um mehrere Componenten zu benachrichten

  constructor(private router: Router, private firestore: AngularFirestore) {}

  initializeSession() {
    //TODO: Make initial GET-Request
    //Check, which questions are displayable

    this.questions.forEach((q) => {
      if (q.used == false) {
        this.freeQuestions.push(q);
      }
    });
    
    /*
    this.firestore
      .collection('questions')
      .get()
      .subscribe((ss) => {
        ss.docs.forEach((doc) => {
          const q = doc.data() as Question;
          console.log(q.question);
          const question: Question = {id:"1", picture: q.picture,question:q.question, category: q.category, used: q.used};
          this.questions.push(question);
        });
      });*/
    this.fetchData();



    console.log("question1: ")
    console.log( this.questions);

    console.log("question2: ")

    console.log( this.questions2);
    console.log(this.ques);


    //console.log(this.questions);

    //console.log(this.questions);
    //Set initial random index
    this.index = Math.floor(Math.random() * this.freeQuestions.length);
  }

  async fetchData() {
    const data = await this.firestore.collection('questions').get().toPromise();

    const ques : Question[]=[];
    data.forEach((doc) => {
      const q = doc.data() as Question;
      //console.log(q.question);
      const question: Question = {
        id: '1',
        picture: q.picture,
        question: q.question,
        category: q.category,
        used: q.used,
      };
      this.questions2.push(question);
    });
  }

  updateChoosenQuestions(event: string) {
    if (event === 'swipeleft') {
      this.choosenQuestions.push(this.freeQuestions[this.index]);
      this.freeQuestions.splice(this.index, 1);
    }
    this.freeQuestions['used'] = true; //ggf. obsolet

    //Get new random index
    this.index = Math.floor(Math.random() * this.freeQuestions.length);

    this.freeQuestionChanged.emit(this.freeQuestions);
    this.indexChanged.emit(this.index);
    this.choosenQuestionChanged.emit(this.choosenQuestions);
  }

  //GET
  getQuestions() {
    return this.firestore.collection('questions').snapshotChanges();
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

  getFreeQuestions() {
    return this.freeQuestions.slice();
  }

  getIndex() {
    return this.index;
  }

  updateFreeQuestions(event: string) {}
}
