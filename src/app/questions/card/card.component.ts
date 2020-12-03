import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';
import data from './questions.json';

import { Subject } from 'rxjs';
import { Question } from './question';

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
  public questions: Question[] = data; //questions from fake REST-Api,
  public free_questions: Question[] = []; //questions that are ready to display, becaue not choosen already
  public choosen_questions: Question[] = []; //questions to reflect on later

  public index = 0;
  @Input()
  parentSubject: Subject<any>;

  animationState: string;
  constructor() {}

  calls = 0;

  ngOnInit() {
    //Check, which questions are displayable
    this.questions.forEach((q) => {
      if (q.used == false) {
        this.free_questions.push(q);
      }
    });

    //Set Subscription for "newcard requested"-Event
    this.parentSubject.subscribe((event) => {
      this.startAnimation(event);

      console.log(event);
      //Set actual question to USED

      if (event === 'swipeleft') {
        this.choosen_questions.push(this.free_questions[this.index]);
        this.free_questions.splice(this.index, 1);

      }
      this.free_questions['used'] = true;

      //Get new random index
      this.index = Math.floor(Math.random() * this.free_questions.length);
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
  }
}
