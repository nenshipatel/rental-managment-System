import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
    private authService : AuthService,
    private router: Router) { }

  public adminLoginForm!: FormGroup;
  public errMessage !: string;
  ngOnInit(): void {
    this.adminLoginForm  = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
       password:['',Validators.required]
     })
  }
  adminLogin(){
;
    this.authService.AdminLogin(this.adminLoginForm.value).subscribe(
      res=>{
        localStorage.setItem('adminData',res.token);
         this.router.navigate(['admin/dashboard'])
      },err=>{

         this.errMessage= err.error.message;
      }
    )
  }
}
