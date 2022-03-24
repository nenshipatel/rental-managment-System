import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  user!:null | String;
  constructor(public authService : AuthService,
    private router : Router){}


  logout(){
    this.user = this.authService.getToken();
    this.authService.logout(this.user)
    localStorage.removeItem('userData');
    this.router.navigate(['/login'])

  }

}
