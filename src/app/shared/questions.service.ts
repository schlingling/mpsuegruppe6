import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Question } from './question';
import data from './questions.json';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private questions: Question[] = data; //questions from fake REST-Api,
  private freeQuestions: Question[] = []; //questions that are ready to display, becaue not choosen already
  private choosenQuestions: Question[] = []; //questions to reflect on later
  private index: number = 0;

  public indexChanged = new EventEmitter<number>();
  public freeQuestionChanged = new EventEmitter<Question[]>();
  public choosenQuestionChanged = new EventEmitter<Question[]>();



  private questionsUpdated = new Subject(); //später benutzen um mehrere Componenten zu benachrichten

  constructor(private http: HttpClient, private router: Router) {}

  initializeSession() {
    //TODO: Make initial GET-Request
    //Check, which questions are displayable
    this.questions.forEach((q) => {
      if (q.used == false) {
        this.freeQuestions.push(q);
      }
    });

    //Set initial random index
    this.index = Math.floor(Math.random() * this.freeQuestions.length);

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


  getFreeQuestions(){
    return this.freeQuestions.slice();
  }

  getIndex(){
    return this.index;
  }

  updateFreeQuestions(event: string) {}
}
