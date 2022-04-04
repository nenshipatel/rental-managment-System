import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/shared/state.service';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/shared/Models/cityModel';
import { State } from 'src/app/shared/Models/stateModel';
@Component({
  selector: 'app-city-view',
  templateUrl: './cityView.componant.html',

})
export class AdminCityViewComponent implements OnInit {


  public city:any=[];
  public cityUpadate:City[]=[];
  public id:any;
  public State!:State[];
  public files:string[]  =  [];
  public cityForm!: FormGroup;
  public displayStyledelete= "none";
  public displayStyle= "none";
  public cityEditForm!: FormGroup;
  public errMessage : any;
  public imgUrl:any=[];
  p: number = 1;

  total!:number;
  constructor(private stateService : StateService,
    private formBuilder: FormBuilder ,
    private router : Router) { }

  ngOnInit(): void {
    this.cityEditForm  = this.formBuilder.group({
      state:['',Validators.required],
      cityName:['',Validators.required],
      images:['',Validators.required],
      })


      this.stateService.getState().subscribe(res=>{
        this.State=res;
      })

      this.GetCity(this.p)

 }

 GetCity(p:number){
  this.stateService.getCity(p).subscribe(
    res=>{
      this.city=res.city;
      this.total=res.city_count
      console.log(res.city_count)
    }
  )
 }
  onFileSelect(event:any) {
    for  (var i =  0; i <  event.target.files.length; i++)  {
      this.files.push(event.target.files[i]);
  }
 }
  openDeletePopup() {

    this.displayStyledelete= "block";

  }
  closeDeletePopup() {
    this.displayStyledelete= "none";
  }

  openPopup(id:string) {
   this.id=id;
    this.displayStyle= "block";
    this.stateService.getCityById(id).subscribe(res=>{

      this.cityEditForm.setValue({
        state: res.city.state,
        cityName: res.city.cityName,
        images:res.city.images
     });
     this.imgUrl=res.city.images
    })

  }
  closePopup() {
    this.displayStyle= "none";
  }

  delete(id:string,i:number){

    this.stateService.deleteCity(id).subscribe((res) => {
       this.city.splice(i, 1);
     },err=>{
      this.errMessage=err.error.message;
    });
     this.displayStyledelete= "none";
  }


  editCity(){

    const formData = new FormData();

    formData.append('state', this.cityEditForm.get('state')?.value);
    formData.append('cityName', this.cityEditForm.get('cityName')?.value);

    for  (var i =  0; i <  this.files.length; i++)  {
      formData.append("images",  this.files[i]);

  }

    this.stateService.updateCity(this.id,formData).subscribe(res=>{


      this.errMessage =res;
      this.router.navigate(['admin/city/view']);

    },err=>{

      this.errMessage=err.error.message;
    })
    this.displayStyle="none"
  }




  getPage(pageNo: number) {
    this.p = pageNo;

    this.GetCity(this.p)


  }

}
