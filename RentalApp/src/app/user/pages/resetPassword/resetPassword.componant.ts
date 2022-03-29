import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-resetPassword',
  templateUrl: './resetPassword.componant.html'

})
export class ResetPasswordComponant implements OnInit{

  public resetPassForm !: FormGroup;
  public email!: string
  message!: string;
  errorMesasge !: string;
  id!:string | null
  constructor(private formBuilder: FormBuilder,
    private authService : AuthService,
    private router : Router,
    private  activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.resetPassForm= this.formBuilder.group({
      password:['',[Validators.required,
        Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]]
    })
  }

  resetPassword(){
    //console.log(this.resetPassForm.value)
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    this.authService.resetPassword(this.id ,this.resetPassForm.value).subscribe(res=>{
       this.message = res.message;
       this.router.navigate(['/login'])
  },err=>{
    this.errorMesasge = err.error.errorMessage
  })
  }
}
