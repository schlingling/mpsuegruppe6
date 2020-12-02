import { Component, DebugElement, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  parentSubject:Subject<string> = new Subject();







  cardAnimation(value) {
    console.log(value)
    this.parentSubject.next(value);
  }

}
