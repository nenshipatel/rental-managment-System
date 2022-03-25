import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-upadteProfile',
  templateUrl: './updateProfile.componant.html',


})
export class UpdateProfile implements OnInit {
  public userProfileForm !: FormGroup;
  files:string  []  =  [];
  public SucessMessage!:string;
  public errMessage !: string;
  constructor(private router : Router,
    private formBuilder: FormBuilder,
    private avtivatedRoute : ActivatedRoute,
    private authService : AuthService) { }
    public User :any;
    public url!:any;
  ngOnInit(): any {

    this.userProfileForm= this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      address:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      pinCode:['',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.max(6)]],
      images:[''],

    })


    this.authService.getLoggedInUser().subscribe(res=>{
     this.User=res
     console.log(res)
     this.userProfileForm.get('name')?.setValue(res.name)
     this.userProfileForm.get('email')?.setValue(res.email)
     this.userProfileForm.get('phone')?.setValue(res.mno)
    })


  }


  upadteProfile(){


    const formData = new FormData();
    formData.append('name', this.userProfileForm.get('name')?.value);
    formData.append('email', this.userProfileForm.get('email')?.value);
    formData.append('phone', this.userProfileForm.get('phone')?.value);

    formData.append('address', this.userProfileForm.get('address')?.value);
    formData.append('city', this.userProfileForm.get('city')?.value);
    formData.append('state', this.userProfileForm.get('state')?.value);
    formData.append('pinCode', this.userProfileForm.get('pinCode')?.value);
    //formData.append('images', this.userProfileForm.get('images')?.value);

    for  (var i =  0; i <  this.files.length; i++)  {
      formData.append("images",  this.files[i]);
    }

    this.authService.editProfile(formData).subscribe(res=>{
      this.SucessMessage=res.message
    },err=>{
      this.errMessage=err.errMessage;
    })

  }




  onFileChange(event:any) {
    for  (var i =  0; i <  event.target.files.length; i++)  {
       this.files.push(event.target.files[i]);

    if (event.target.files && event.target.files[i]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
          this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[i]);
    }
    }

 }



}


