import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-admin-changePassword',
  templateUrl: './adminChangepassword.componant.html',

})
export class AdminChangePasswordComponent implements OnInit {

  public errMessage !: string;
  public cahangePassForm!: FormGroup

  constructor(private router : Router,
    private formBuilder : FormBuilder,
    private authService : AuthService) { }


  ngOnInit(): void {
    this.cahangePassForm  = this.formBuilder.group({
      oldpassword:['',[Validators.required,  Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      newpassword:['',[Validators.required ,  Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      })
  }


  chanePassword(){
    this.authService.changeAdminPassword(this.cahangePassForm.value).subscribe(res=>{
      console.log(res)
    });
  }

}
