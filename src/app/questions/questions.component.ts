import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { QuestionsService } from '../shared/questions.service';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';
import { Question } from './../shared/question';
import data from './../shared/questions.json';



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
  choosenQuestionsIsFull: boolean = false;
  
  parentSubject: Subject<string> = new Subject();
  
  private choosenQuestionsSub: Subscription;
  categories: String[] = [];
  private questions: Question[] = data;
  animationState: string;
  
  
  public contentLoaded: Promise<boolean>;

  public questionsTest: Question[] = [];


  public free_questions: Question[] = []; //questions from Questionsservice
  public index: number = 0; //index from QuestionsService

  private indexSub: Subscription;
  private freeQuestionsSub: Subscription;

  constructor(private questionsService: QuestionsService, private router: Router) { }

  ngOnInit(): void {
    this.choosenQuestionsSub = this.questionsService.choosenQuestionChanged.subscribe(
      (choosenQuestions) => {
        if (choosenQuestions.length >= 3) {
          this.choosenQuestionsIsFull = true;
          choosenQuestions.forEach((q) => {
            if (!this.categories.includes(q.category)) {
              this.categories.push(q.category);
            }
          });
        }
      }
    );


    this.questionsService.getQuestions().subscribe(data => {
      this.questionsTest = data.map(e => {
        console.log(e.payload.doc.data());
        const q = e.payload.doc.data() as Question;
        return {
          id: e.payload.doc.id,
          picture: q.picture,
          question: q.question,
          category: q.category,
          used: q.used,
        } as Question;
      })

      console.log(this.questionsTest);
      this.contentLoaded = Promise.resolve(true);

    });



    //Check, which questions are displayables
    this.questionsService.initializeSession();

    //Set inital values from service
    this.free_questions = this.questionsService.getFreeQuestions();
    this.index = this.questionsService.getIndex();

    //Listen to updates of freeQuestions & index
    this.indexSub = this.questionsService.indexChanged.subscribe((index) => {
      this.index = index;
    });
    this.freeQuestionsSub = this.questionsService.freeQuestionChanged.subscribe(
      (questions) => {
        this.free_questions = questions;
      }
    );

    //Listen for "newcard requested"-Event --> wenn buttons geklickt werden, dann neue Values ziehen
    this.parentSubject.subscribe((event) => {
      this.startAnimation(event);
      //Set actual question to USED
      this.questionsService.updateChoosenQuestions(event);
    });


  }


  /*
  getCardAnimation(){
      return this.cardAnimation;
  }*/

  cardAnimation(value) {
    this.parentSubject.next(value);
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


  ngOnDestroy() {
    this.choosenQuestionsSub.unsubscribe();
    this.parentSubject.unsubscribe();
    this.indexSub.unsubscribe();
    this.freeQuestionsSub.unsubscribe();
  }
}
