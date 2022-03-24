import { Component, Injectable, OnInit } from '@angular/core';
import { FormGroup ,FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
@Injectable()
export class RegisterComponent implements OnInit {



  constructor(private formBuilder : FormBuilder,
    private authservice:AuthService,
    private router: Router) { }

  public errorMsg !: string
  public SingUpForm !: FormGroup;

  ngOnInit(): void {

    this.SingUpForm = this.formBuilder.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
        })
  }

  register(){

    this.authservice.UserRegister(this.SingUpForm.value)
    .subscribe(
      res=>{
        console.log(res)
        this.errorMsg=res.message;
        this.SingUpForm.reset();


        console.log(this.errorMsg)
        if(this.errorMsg === 'Your Account is sucessfully Created!!'){
          this.router.navigate(['/login']);
        }

      },err=>{
        console.log(err.errors.email.name)
        this.errorMsg =   err.error.message
        this.SingUpForm.reset();
      }
    )
  }
}
