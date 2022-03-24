import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { PropertyService } from 'src/app/shared/property.service';

@Component({
  selector: 'app-admin-property',
  templateUrl: './adminProperty.componant.html',

})
export class AdminProprtyComponent implements OnInit {

  Property:any=[];
  public displayStyle = "none"
  constructor(
  private propertyService : PropertyService,
   private router : Router ) { }



  ngOnInit(): void {
    this.propertyService.getAllProperty().subscribe(
      res=>{

        this.Property=res
      }
    )

  }


  delete(id:any,i:any){
      this.propertyService.deleteProperty(id).subscribe(res => {
        this.Property.splice(i, 1);
      });
      this.displayStyle = "none";
    }

  openPopup() {
   this.displayStyle = "block";

  }
  closePopup() {
    this.displayStyle = "none";
  }




}
