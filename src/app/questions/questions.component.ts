import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { QuestionsService } from '../shared/questions.service';
import { trigger, keyframes, animate, transition } from '@angular/animations';
import * as kf from './keyframes';
import { Question } from './../shared/question';

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
  ) {}

  ngOnInit(): void {
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

      console.log(this.questions)
      this.questions.forEach((q) => {
        if (q.used == false) {
          this.free_questions.push(q);
        }
      });

      console.log(this.free_questions)

      this.index = Math.floor(Math.random() * this.free_questions.length);
      this.contentLoaded = Promise.resolve(true);
    });

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
