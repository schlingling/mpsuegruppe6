import { Component, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { QuestionsService } from '../shared/questions.service';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';
import { Question } from './../shared/question';
import { Statement } from './../shared/statement';


import data from './../shared/statement.json';



@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft))),
    ]),
  ],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  public choosenQuestionsIsFull: boolean = false;
  public contentLoaded: Promise<boolean>;

  public questions: Question[] = []; //questions from Questionsservice
  public free_questions: Question[] = []; //free_questions
  public choosen_questions: Question[] = []; //choosen_questions
  public questions_categories: String[] = [];
  public index: number = 0;

  animationState: string;

  constructor(
    private questionsService: QuestionsService,
    private router: Router
  ) {
    //INITIAL GET-REQEUST FOR MESSAGES
    this.questionsService.getQuestions().subscribe((data) => {
      this.questions = data.map((e) => {
        const q = e.payload.doc.data() as Question;
        return {
          id: e.payload.doc.id,
          picture: q.picture,
          question: q.question,
          category: q.category,
          used: q.used,
        } as Question;
      });

      this.questions.forEach((q) => {
        if (q.used == false) {
          this.free_questions.push(q);
        }
      });

      this.index = Math.floor(Math.random() * this.free_questions.length);
      this.contentLoaded = Promise.resolve(true);
    });
  }

  ngOnInit(): void {
    
    //SCRIPT FOR AUTOIMPORT DATA TO FIRESTORE
    /*
    data.forEach((obj:Statement) => {
      this.questionsService.getFirestore().collection("statements").add({
        statement: obj.statement,
        category: obj.category,
      }).then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
  });
  */

  }

  cardAnimation(event: string) {

    this.startAnimation(event);


    if (event === 'swipeleft') {
      this.choosen_questions.push(this.free_questions[this.index]);
      this.free_questions.splice(this.index, 1);
    }
    this.free_questions['used'] = true; //ggf. obsolet

    //Get new random index
    this.index = Math.floor(Math.random() * this.free_questions.length);

    if (this.choosen_questions.length >= 3) {
      this.choosenQuestionsIsFull = true;
      this.choosen_questions.forEach((q) => {
        if (!this.questions_categories.includes(q.category)) {
          this.questions_categories.push(q.category);
        }
      });

      
      @Output() messageEvent = new EventEmitter<String>();
     
      this.messageEvent.emit("test");

    }


    //TODO: Call to service for updating values
  }

  redirectToMeditation() {
    this.router.navigate(['/meditation']);
  }

  startAnimation(state) {
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState(state) {
    this.animationState = '';
  }

  ngOnDestroy() {}
}
