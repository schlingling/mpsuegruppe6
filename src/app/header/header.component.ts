import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarOpen = false;
  isAuthenticated = false;
  private userSub: Subscription;


  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
    setTimeout(()=>{
      this.closeNavbar();
    },2000)

  }

  closeNavbar(){
    this.navbarOpen=false;
  }

  logout() {
    this.authService.logout();
  }

}
