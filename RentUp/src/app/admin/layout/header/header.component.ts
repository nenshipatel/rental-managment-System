import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'admin-app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  admin!: null | string;
  constructor(public authService : AuthService,
    private router : Router) {

    }

  ngOnInit(): void {
  }
  adminLogout(){
    this.admin = this.authService.getToken();
    console.log(this.admin)
    this.authService.adminLogout(this.admin)
        localStorage.removeItem('adminData');

        this.router.navigate(['admin/login'])
  }



}



