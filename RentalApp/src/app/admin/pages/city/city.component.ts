import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/shared/state.service';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  public State:any=[];
  public city:any=[]
  files:string  []  =  [];
  errMessage!:string;

  public cityForm!: FormGroup;
  constructor(private stateService : StateService,
    private formBuilder: FormBuilder ,
    private router : Router) { }

  ngOnInit(): void {

    this.cityForm  = this.formBuilder.group({
      state:['',Validators.required],
      cityName:['',Validators.required],
      images:['',Validators.required]
      })

    this.stateService.getState().subscribe(res=>{
      this.State=res;
    },err=>{
      this.errMessage=err.error.message;
    })

    this.stateService.gretCity().subscribe(res=>{

      this.city=res;
    },err=>{
      this.errMessage=err.error.message;
    })

  }

  onFileSelect(event:any) {
    for  (var i =  0; i <  event.target.files.length; i++)  {
      this.files.push(event.target.files[i]);
  }
 }

  cityAdd(){


    const formData = new FormData();
    formData.append('state', this.cityForm.get('state')?.value);
    formData.append('cityName', this.cityForm.get('cityName')?.value);

    for  (var i =  0; i <  this.files.length; i++)  {
      formData.append("images",  this.files[i]);
  }


  this.stateService.addCity(formData).subscribe(
    res=>{

         this.cityForm.reset()
         this.router.navigate(['/admin/city/view'])
    },err=>{
        this.errMessage=err.error.message;
    }
  )}



}
