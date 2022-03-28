import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/shared/property.service';
import { StateService } from 'src/app/shared/state.service';

@Component({
  selector: 'app-dashbourd',
  templateUrl: './dashbourd.component.html',
  styleUrls: ['./dashbourd.component.css']
})
export class DashbourdComponent implements OnInit {

  public property1: any=[];
  public property:any=[]
  public city:any=[];
  public opacity ='50%';
  constructor(private propertyService: PropertyService,
    private router: Router,
    private stateService : StateService) { }

  ngOnInit(): void {
    this.propertyService.getAllUserProperty().subscribe(
      res=>{
        this.property1=res
   })

   this.stateService.gretCity().subscribe(res=>{
      this.city = res

   })
  }

  details(id:any){
  
    this.router.navigate([`/propertyDetails/${id}`])
  }


  cityWiseProperty(id: any){

     this.router.navigate([`/propertyList`,id])
  }

  navigateToProperty(){
    this.router.navigate(['/propertyList'])
  }

}
