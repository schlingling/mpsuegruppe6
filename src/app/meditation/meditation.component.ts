import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../shared/questions.service';
import { Statement } from './../shared/statement';


@Component({
  selector: 'app-meditation',
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.css']
})
export class MeditationComponent implements OnInit {

  timeLeft: number = 60;
  interval;

  public questions_categories: String[] = ["Entspannung", "Gesundheit", "Familie"];
  public category: String;
  public all_statements: Statement[] = [];
  public statements_with_category: Statement[] = [];
  public index: number = 0;
  public contentLoaded: Promise<boolean>;
  public choosen_statement: String;




  constructor(private questionsService: QuestionsService) { }

  ngOnInit(): void {
  }


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
          this.timeLeft = 60;
          this.pausePressed = false;
          this.canPress = true;
          clearInterval(this.interval);        }
      },100)
    }

    
  }

  public pausePressed: boolean = false;
  pauseTimer() {
    this.canPress = true;
    this.pausePressed = true;
    clearInterval(this.interval);
   

  }

  getStatement(){
    this.all_statements = []
    this.statements_with_category = []

    console.log(this.questions_categories)

    this.category = this.questions_categories[0]
    this.questions_categories.splice(0,0)
    

    //INITIAL GET-REQEUST FOR MESSAGES
    this.questionsService.getQuestions('statements').subscribe((data) => {
      this.all_statements = data.map((e) => {
        const q = e.payload.doc.data() as Statement;
        return {
          id: e.payload.doc.id,
          statement: q.statement,
          category: q.category
        } as Statement;
      });

      //pick a all statements, that matched the category
      this.all_statements.forEach((q) => {
        if (q.category === this.category) {
          this.statements_with_category.push(q);
        }
      });

      if(this.statements_with_category.length <= 0){
        //rufe die endcard-component auf
        console.log("ende");
      }

      //pick a random statement of all the matching ones
      this.index = Math.floor(Math.random() * this.statements_with_category.length);

      this.choosen_statement = this.all_statements[this.index].statement

      this.contentLoaded = Promise.resolve(true);
    });




    this.questions_categories.splice(0,1)
  }

}
