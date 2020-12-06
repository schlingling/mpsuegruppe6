import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { QuestionsService } from '../shared/questions.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
})
export class QuestionsComponent implements OnInit, OnDestroy {
  choosenQuestionsIsFull: boolean = false;

  private freeQuestionsSub: Subscription;
  private choosenQuestionsSub: Subscription;
  categories: String[] = [];

  constructor(private questionsService: QuestionsService, private router: Router) {}

  ngOnInit(): void {
    this.choosenQuestionsSub = this.questionsService.choosenQuestionChanged.subscribe(
      (choosenQuestions) => {
        if (choosenQuestions.length >= 3) {
          console.log(choosenQuestions.length);
          this.choosenQuestionsIsFull = true;

          choosenQuestions.forEach((q) => {
            if (!this.categories.includes(q.category)) {
              this.categories.push(q.category);
            }
          });

          console.log(this.categories);

        }
      }
    );
  }

  parentSubject: Subject<string> = new Subject();

  cardAnimation(value) {
    this.parentSubject.next(value);
  }

  redirectToMeditation(){
    this.router.navigate(['/meditation']);

  }


  ngOnDestroy() {
    this.choosenQuestionsSub.unsubscribe();
  }
}
