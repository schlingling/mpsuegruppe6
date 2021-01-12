import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Note } from '../shared/interfaces/note';
import { QuestionsService } from '../shared/questions.service';
import { Statement } from './../shared/interfaces/statement';
import { DocumentService } from '../shared/document.service';
import { AuthService} from './../auth/auth.service';

@Component({
  selector: 'app-reflection',
  templateUrl: './reflection.component.html',
  styleUrls: ['./reflection.component.css']
})
export class ReflectionComponent implements OnInit {

  testArray: Observable<Note[]>;
  public questions_categories: String[] = [];
  public uid: String;



//SEE FOR MORE INFOS TO REQUEST DATA FROM FIREBASE: https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md

  constructor(private questionsService: QuestionsService, private router: Router, private firestore: AngularFirestore, private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.testArray = this.firestore.collection<Note>('notes').valueChanges();
    this.questions_categories = this.questionsService.getCategories()
    //this.uid = this.auth.userData.value.uid;
  }




  goToRating(){
    this.router.navigate(['/rating'])
  }
}
