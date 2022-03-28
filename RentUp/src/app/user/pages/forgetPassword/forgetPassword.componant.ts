import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
@Component({
  selector: 'app-forgetPassword',
  templateUrl: './forgetPassword.componant.html',
  styleUrls:['./forgetPassword.componant.css']
})
export class forgetPasswordComponant implements OnInit{

  public forPassForm !: FormGroup;
  public email!: string
  message!: string;
  errorMesasge !: string;
  constructor(private formBuilder: FormBuilder, private authService : AuthService) { }

  ngOnInit(): void {
    this.forPassForm= this.formBuilder.group({
      email:['',[Validators.required,Validators.email]]
    })
  }


  forgetpassword(){
     this.email = this.forPassForm.value.email
    this.authService.forgetPassword(this.email).subscribe(
      res=>{
        this.forPassForm.reset();
        this.message="For resetting the password , link is sent your email address."
      },err=>{
        this.errorMesasge=err.error.message
      })
  }
}
