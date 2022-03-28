import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { PropertyService } from 'src/app/shared/property.service';
import { Property } from 'src/app/shared/Models/propertyModel';

@Component({
  selector: 'app-property-Details',
  templateUrl: './propertyDetails.componant.html',
  styleUrls:['./propertyDetails.componant.css']

})
export class propertyDetailComponent implements OnInit {

  public property:Property[]=[]
  displayStyledelete="none"
  id !: any;
  constructor(private router : Router,
    private propertyService : PropertyService,
    private avtivatedRoute : ActivatedRoute) { }


  ngOnInit(): void {
    this.id = this.avtivatedRoute.snapshot.paramMap.get('id');
    this.propertyService.getPropertById(this.id).subscribe(
      res=>{
        this.property[0]=res.pro;

      }

    )

  }




}
