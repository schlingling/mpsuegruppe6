import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import { Subject, Subscription } from 'rxjs';

import * as kf from './keyframes';
import { QuestionsService } from './../../shared/questions.service';
import { Question } from './../../shared/question';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft))),
    ]),
  ],
})
export class CardComponent implements OnInit, OnDestroy {
  @Input()
  parentSubject: Subject<any>;


  @Input()
  choosenQuestionsIsFull: boolean;

  @Input()
  cardanimation;

  private indexSub: Subscription;
  private freeQuestionsSub: Subscription;


  animationState: string;
  public free_questions: Question[] = []; //questions from Questionsservice
  public index: number = 0; //index from QuestionsService

  constructor(private questionsService: QuestionsService) {}

  ngOnInit() {
    //Check, which questions are displayable
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

  startAnimation(state) {
    if (!this.animationState) {
      this.animationState = state;
    }
  }

  resetAnimationState(state) {
    this.animationState = '';
  }

  ngOnDestroy() {
    this.parentSubject.unsubscribe();
    this.indexSub.unsubscribe();
    this.freeQuestionsSub.unsubscribe();
  }
}
