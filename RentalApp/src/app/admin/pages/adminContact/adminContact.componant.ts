import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ContactService } from 'src/app/shared/contact.service';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admincontact.componant.html',

})
export class AdminConatactUsComponent implements OnInit {

  public contact:any=[];
  public errMessage !: string;
  displayStyledelete="none"

  constructor(private router : Router,
    private contactService : ContactService) { }


  ngOnInit(): void {
    this.contactService.getContactdata().subscribe(
      res=>{
        this.contact=res;
      }
    )
  }

  openDeletePopup(id:any) {
    this.displayStyledelete= "block";
  }
  closeDeletePopup() {
    this.displayStyledelete= "none";
  }

  delete(id:any, i:any) {

     this.contactService.deleteContactdata(id).subscribe((res) => {
        this.contact.splice(i, 1);
      },err=>{

      })
      this.displayStyledelete= "none";

    }
}
