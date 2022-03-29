import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { PropertyService } from 'src/app/shared/property.service';
import { Property } from 'src/app/shared/Models/propertyModel';
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


  delete(id:string,i:number){
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
