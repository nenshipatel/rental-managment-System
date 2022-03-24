import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/shared/state.service';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-city-view',
  templateUrl: './cityView.componant.html',

})
export class AdminCityViewComponent implements OnInit {


  public city:any=[];
  public cityUpadate:any=[];
  public id:any;
  public State:any=[];
  public files:string[]  =  [];
  public cityForm!: FormGroup;
  public displayStyledelete= "none";
  public displayStyle= "none";
  public cityEditForm!: FormGroup;
  public errMessage : any;

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

    this.stateService.gretCity().subscribe(
      res=>{
        this.city=res;

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

  openPopup(id:any) {
   this.id=id;
    this.displayStyle= "block";
    this.stateService.getCityById(id).subscribe(res=>{

      this.cityEditForm.setValue({
        state: res.city.state,
        cityName: res.city.cityName,
        images:res.city.images
     });
    })

  }
  closePopup() {
    this.displayStyle= "none";
  }

  delete(id:any,i:any){

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
     // console.log(err)
      this.errMessage=err.error.message;
    })
    this.displayStyle="none"
  }
}
