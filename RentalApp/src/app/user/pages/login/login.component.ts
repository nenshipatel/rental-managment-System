import { Component, OnInit } from '@angular/core';
import { FormBuilder , Validators,FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
   private authservice:AuthService,
   private router : Router ) { }

  public LoginForm!: FormGroup;
  public errorMsg !: string;
  public user!: string | null
  ngOnInit(): void {

    this.LoginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    })


    if(this.user?.length === 0){
      this.authservice.logout(this.user)
      localStorage.removeItem('userData');
      this.router.navigate(['/login'])

    }
  }

  login(){
    this.authservice.UserLogin(this.LoginForm.value).subscribe(
      res=>{

         localStorage.setItem('userData',res.token);
         this.router.navigate(['/dashboard'])
         this.LoginForm.reset()
         this.user = res.token



      },err=>{

         this.errorMsg =   err.error.errMessage
         this.LoginForm.reset();
      }
    )
  }

  navigate(){
    this.router.navigate(['/register'])
  }


}
