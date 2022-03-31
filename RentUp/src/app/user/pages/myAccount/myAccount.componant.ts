import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-MyAcoount',
  templateUrl: './myAccount.componant.html',

})
export class MyAccountComponent implements OnInit {
  public User :any;
  constructor(
    private authService : AuthService,
  ) { }
  ngOnInit(): void {

    this.authService.getLoggedInUser().subscribe((res:any)=>{
      this.User=res
     })
  }





}
