import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reflection',
  templateUrl: './reflection.component.html',
  styleUrls: ['./reflection.component.css']
})
export class ReflectionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToRating(){
    this.router.navigate(['/rating'])
  }
}
