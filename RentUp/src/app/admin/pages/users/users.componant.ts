import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './user.componant.html',

})
export class UsersViewComponent implements OnInit {

  Users:any=[];
  public displayStyle = "none";
  constructor(
   private authservice:AuthService,
   private router : Router ) { }



  ngOnInit(): void {
    this.authservice.getUsers().subscribe(res=>{


      this.Users=res.users;
    })

  }




  openPopup() {
   this.displayStyle = "block";

  }
  closePopup() {
    this.displayStyle = "none";
  }

 delete(id:any,i:any){
  console.log(id);
  this.authservice.deleteUser(id).subscribe((res) => {
     this.Users.splice(i, 1);
   });
   this.displayStyle = "none";
 }


}
