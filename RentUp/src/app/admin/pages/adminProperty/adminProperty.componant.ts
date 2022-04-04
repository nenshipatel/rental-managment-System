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
  p: number = 1;
  total!:number;
  constructor(
  private propertyService : PropertyService,
   private router : Router ) { }



  ngOnInit(): void {
    this.getproperty(this.p)

  }

  getproperty(p:number){
    this.propertyService.getAllPropertyWithpagination(p).subscribe(
      res=>{

       this.Property=res.pro
       this.total=res.pro_count

       
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

  getPage(pageNo: number) {
    this.p = pageNo;
    this.getproperty(this.p)
  }


}
