import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

import { PropertyService } from 'src/app/shared/property.service';


@Component({
  selector: 'app-propertyList',
  templateUrl: './propertyList.componant.html',

})
export class propertyListComponent implements OnInit {

  public property:any=[]
  public User:any={}
  public getAll = false;
  public getcitywiseData= false;
  displayStyledelete="none"
  isLoading = true;
  sortedvalue :any = ""


  param1 = this.activatedRoute.snapshot.paramMap.get('id')
  public cityPropety : any=[];

  constructor(private router : Router,
    private propertyService : PropertyService,
    private authService : AuthService,
    private activatedRoute : ActivatedRoute) { }
    // page = 1;
    // pageSize=3
    term!: string;
    p: number = 1;
    NoDataFoundMessage !: string
   total!: number;


  ngOnInit(): void {

      this.getPropertyList(this.p);

      this.authService.getLoggedInUser().subscribe(
        res=>{
          this.User=res

        }
      )


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
      this.total=res.pro_total

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

  details(id:any){
    this.router.navigate([`/propertyDetails/${id}`])
  }


  getPage(pageNo: any) {
    this.p = pageNo;
    if(this.param1){
      this.getCityWiseproperty(this.param1,this.p)
    }
    else{
      this.getPropertyList(this.p);
    }

   // this.getSortedPropertyList(this.p)

    //this.cityWiseSortedData(this.p)
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



  cityWiseSortedData(p:any){
    this.getcitywiseData=true;
    this.getAll=false;
    this.propertyService.getProprtyByCitysorted(this.param1,this.p,this.sortedvalue).subscribe(res=>{
      this.isLoading=false;
     this.cityPropety=res.pro
     this.total=res.pro_total
   })
  }
}
