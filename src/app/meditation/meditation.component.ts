import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meditation',
  templateUrl: './meditation.component.html',
  styleUrls: ['./meditation.component.css']
})
export class MeditationComponent implements OnInit {

  timeLeft: number = 60;
  interval;



  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 60;
      }
    },1000)
  }


  pauseTimer() {
    clearInterval(this.interval);
  }

  navToRef(){
this.router.navigate(['/reflection']);
  }
}
