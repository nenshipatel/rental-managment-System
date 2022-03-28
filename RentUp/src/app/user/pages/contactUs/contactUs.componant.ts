import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from 'src/app/shared/contact.service';

@Component({
  selector: 'app-dashbourd',
  templateUrl: './contactUs.componant.html',

})
export class ConatactUsComponent implements OnInit {

  contactForm !: FormGroup;
  msg !: string
  constructor(private formBuilder: FormBuilder,
  private contactService : ContactService,
  private router : Router) { }


  ngOnInit(): void {
    this.contactForm  = this.formBuilder.group({
      Name:['',Validators.required],
      email:['',Validators.required],
      subject:['',Validators.required],
      message:['',Validators.required]
     })
  }

  addContactData(){
    this.contactService.addContactData(this.contactForm.value).subscribe(
      res=>{
        this.msg=res.message
        this.router.navigate(['/conatctus']);
        this.contactForm.reset();
      }
    )
  }

}
