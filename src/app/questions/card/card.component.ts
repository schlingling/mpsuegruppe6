import { Component, OnInit, Input, OnDestroy, DebugElement } from '@angular/core';
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
    //console.log("komme in startAnimation")
    if (!this.animationState) {
      this.animationState = state;
    }


  }

  //array of all free questions
  public free_questions: Question[] = data;
  public test: Question[];
  public random_index = 0;

  resetAnimationState(state) {
    this.animationState = '';

    //TODO make the index randomized and only pick unused questions

    //collect all not used questions
    this.questions.forEach(function(question){
      if(question.used == false){
        console.log("KLAPPT");
        this.free_questions.push(question)
      }
    })
    console.log(this.free_questions)
    this.index = (Math.random() * this.free_questions.length) - 1

    console.log("random index: " + this.index)





    

    //this.index = (this.index + 1) % this.questions.length;

    //console.log("komme in resetAnimationState mit index danach: " + this.index)
  }


  ngOnDestroy() {
    this.parentSubject.unsubscribe();
  }

}
