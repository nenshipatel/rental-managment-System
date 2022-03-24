import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

import { PropertyService } from 'src/app/shared/property.service';
import { Property } from 'src/app/shared/Models/propertyModel';

@Component({
  selector: 'app-propertyList',
  templateUrl: './propertyList.componant.html',

})
export class propertyListComponent implements OnInit {

  public property:Property[]=[]
  public User:any={}
  public getAll = false;
  public getcitywiseData= false;
  displayStyledelete="none"
  isLoading = true;
  sortedvalue :string = ""



  public cityPropety : Property[]=[];

  constructor(private router : Router,
    private propertyService : PropertyService,
    private authService : AuthService,
    private activatedRoute : ActivatedRoute) { }

    term!: string;
    p: number = 1;
    NoDataFoundMessage !: string
   total!: number;
   cityTotal!:number;
   param1 = this.activatedRoute.snapshot.paramMap.get('id')

  ngOnInit(): void {

      this.getPropertyList(this.p);



      if(this.param1){
          this. getCityWiseproperty(this.param1,this.p)
      }

  }

  getCityWiseproperty(id:any,p:number){
    this.getAll=false;
    this.getcitywiseData= true;
    this.propertyService.getProprtyByCity(id,p).subscribe(res=>{
      this.isLoading=false;
      this.cityPropety=res.pro
      this.cityTotal=res.pro_total

      if( this.cityPropety.length === 0){
        this.NoDataFoundMessage = "No Data Found!!"
      }
    })
  }


  getPropertyList(p:number){
    this.getcitywiseData=false;
    this.getAll=true;
    this.propertyService.getListOfProperty(p).subscribe(
      res=>{
        this.isLoading=false;
        this.property=res.pro;

        this.total = res.pro_total;

      } );
  }

  getSortedPropertyList(p:number){
    this.getcitywiseData=false;
    this.getAll=true;
    this.propertyService.getSortedData(p,this.sortedvalue).subscribe(
      res=>{
        this.property=res.pro;
        this.total = res.pro_total;

      } );
  }

  details(id:string){
    this.router.navigate([`/propertyDetails/${id}`])
  }


  getPage(pageNo: number) {
    this.p = pageNo;
    if(this.param1){
      this.getCityWiseproperty(this.param1,this.p)
    }
    else{
      this.getPropertyList(this.p);
    }

    if(this.sortedvalue){
      if(this.param1){
        this.cityWiseSortedData(this.p)
      }
      else{
        this.getSortedPropertyList(this.p)
      }

    }

  }


  onChangeName(e:any){
    this.sortedvalue=e.target.value;

    if(this.param1){

      this.cityWiseSortedData(this.p);
    }
    else{

      this.getSortedPropertyList(this.p)
    }

  }



  cityWiseSortedData(p:number){
    this.getcitywiseData=true;
    this.getAll=false;
    this.propertyService.getProprtyByCitysorted(this.param1,this.p,this.sortedvalue).subscribe(res=>{
      this.isLoading=false;
     this.cityPropety=res.pro
     this.cityTotal=res.pro_total
   })
  }
}
