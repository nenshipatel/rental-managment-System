import { Component, OnInit } from '@angular/core';

import {  Router } from '@angular/router';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';



@Component({
  selector: 'app-changepassword',
  templateUrl: './cahgePassword.componant.html',


})
export class ChangePasswordComponant implements OnInit {
  public changePassForm !: FormGroup;
  files:string  []  =  [];
  public SucessMessage!:string;
  public errMessage !: string;
  constructor(private router : Router,
    private formBuilder: FormBuilder,
    private authService : AuthService) { }
    public User :any;

  ngOnInit(): any {


    this.changePassForm= this.formBuilder.group({
      oldPassword:['',[Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      newPassword:['',[Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    })
  }



  changePassword(){
    this.authService.changePassword(this.changePassForm.value).subscribe(
      res=>{

        this.SucessMessage=res.message;
        this.changePassForm.reset();
        this.router.navigate(['/upadteProfile'])
      },err=>{
        this.errMessage=err.error.errorMessage
      }
    )
  }
}


