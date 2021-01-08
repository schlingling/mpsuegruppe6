import { Text } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../shared/questions.service';
import { Statement } from './../shared/interfaces/statement';
import { Note } from './../shared/interfaces/note';
import { DocumentService } from '../shared/document.service';
import { Router } from '@angular/router';
import { AuthService} from './../auth/auth.service';


@Component({
  selector: 'app-meditation',
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.css']
})
export class MeditationComponent implements OnInit {

  timeLeft: number = 60;
  interval;

  public questions_categories: String[] = [];
  public category: String;
  public all_statements: Statement[] = [];
  public statements_with_category: Statement[] = [];
  public index: number = 0;
  public contentLoaded: Promise<boolean>;
  public choosen_statement: string;

  public text_to_save: Note = {};



  constructor(private questionsService: QuestionsService, private documentService: DocumentService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {

    this.questions_categories = this.questionsService.getCategories()
    console.log(this.questionsService.getCategories())
  }

  public pausePressed: boolean = false;
  public canPress: boolean = true;

  startTimer() {

    if(this.canPress == true){
      this.canPress = false;

      if(this.pausePressed == false){
        this.getStatement()
      }
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {

          this.defaultValue = "";
          this.timeLeft = 60;
          this.pausePressed = false;
          this.canPress = true;
          clearInterval(this.interval);        }
      },300)
    }


  }



  defaultValue: string = "";
  upload() {
    //upload data to firestore

    console.log("upload")


    this.text_to_save.note = this.defaultValue;

    //TODO
    this.text_to_save.uid = this.auth.userData.value.uid;
    this.text_to_save.statement = this.choosen_statement;

    this.documentService.setDocument('notes',this.text_to_save);
    this.defaultValue = "";
  }

  getStatement(){
    this.all_statements = []
    this.statements_with_category = []

    console.log(this.questions_categories)

    this.category = this.questions_categories[0]
    this.questions_categories.splice(0,1)


    //INITIAL GET-REQEUST FOR MESSAGES
    this.documentService.getDocument('statements').subscribe((data) => {
      this.all_statements = data.map((e) => {
        const q = e.payload.doc.data() as Statement;
        return {
          uid: e.payload.doc.id,
          statement: q.statement,
          category: q.category
        } as Statement;
      });

      //pick a all statements, that matched the category
      this.all_statements.forEach((q) => {
        console.log(q.category)
        if (q.category === this.category) {
          this.statements_with_category.push(q);
        }
      });

      if(this.statements_with_category.length <= 0){
        //rufe die endcard-component auf
        console.log("ende, call endcard component" + this.statements_with_category.length);
        this.router.navigate(['/reflection']);
        return;
      }

      //pick a random statement of all the matching ones
      this.index = Math.floor(Math.random() * this.statements_with_category.length);

      this.choosen_statement = this.statements_with_category[this.index].statement
      console.log(this.choosen_statement)

      this.contentLoaded = Promise.resolve(true);
    });




  }

}
