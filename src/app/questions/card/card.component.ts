import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { trigger, keyframes, animate, transition } from "@angular/animations";
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
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft)))
    ])
  ]

})
export class CardComponent implements OnInit, OnDestroy{

  public questions: Question[] = data ;


  public index = 0;
  @Input()
  parentSubject: Subject<any>;



  animationState: string;
  constructor() { }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      this.startAnimation(event)
    });

  }

  startAnimation(state) {
    if (!this.animationState) {
      this.animationState = state;
    }


  }

  resetAnimationState(state) {
    this.animationState = '';
    this.index++;
  }


  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }

}
