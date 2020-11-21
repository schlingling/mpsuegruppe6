import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startseite',
  templateUrl: './startseite.component.html',
  styleUrls: ['./startseite.component.css']
})
export class StartseiteComponent implements OnInit {


  constructor(private router: Router,){}


  ngOnInit(): void {
  }


  redirectToAbout(){
    this.router.navigate(['/about']);

  }

  redirectToFrage(){
    this.router.navigate(['/frage']);

  }



}

