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
  public all_notes: Note[] = [];
  public categories_and_notes: [String, String []] [] = [];
  public categorie_and_note: [String, String []];
  public notes: String [] = [];



//SEE FOR MORE INFOS TO REQUEST DATA FROM FIREBASE: https://github.com/angular/angularfire/blob/master/docs/firestore/collections.md

  constructor(private documentService: DocumentService, private questionsService: QuestionsService, private router: Router, private firestore: AngularFirestore, private auth: AuthService
    ) { }

  ngOnInit(): void {
    this.testArray = this.firestore.collection<Note>('notes').valueChanges();
    this.questions_categories = this.questionsService.getCategories()
    this.getPostStatements()
    //this.uid = this.auth.userData.value.uid;
  }


  getPostStatements(){
    //INITIAL GET-REQEUST FOR MESSAGES
    this.documentService.getDocument('notes').subscribe((data) => {
      test: String;
      this.all_notes = data.map((e) => {
        const q = e.payload.doc.data() as Note;
        return {
          uid: e.payload.doc.id,
          statement: q.statement,
          note: q.note,
          category: q.category
        } as Note;
      });

      this.questions_categories.forEach((category) => {
        
        this.categorie_and_note[0] = category;

        this.all_notes.forEach((q) => {
          if (q.category === category) {

            this.notes.push(q.statement)
            
          }
        });

        this.categorie_and_note[1] = this.notes;

        this.categories_and_notes.push(this.categorie_and_note)

      });
      
  });
}


  goToRating(){
    this.router.navigate(['/rating'])
  }
}
