import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/shared/property.service';

import { StateService } from 'src/app/shared/state.service';
@Component({
  selector: 'app-property',
  templateUrl: './property.componant.html',

})
export class PropertyComponent implements OnInit {
  public proprtyForm !: FormGroup;

  files:string  []  =  [];
  public City :any=[];
  public State :any=[];

  public errorMessage!: string;
  constructor(private formBuilder: FormBuilder,
    private proService : PropertyService,
    private router: Router,
    private stateService : StateService) { }

  ngOnInit(): void {

    this.proprtyForm= this.formBuilder.group({
      pTitle:['',Validators.required],
      status:['',Validators.required],
      type:['',Validators.required],
      price:['',[Validators.required,Validators.pattern("^[0-9]*$")]],
      area:['',[Validators.required, Validators.pattern("^[0-9]*$")]],
      badRoomCount:['',Validators.required],
      bathRoomCount:['',Validators.required],
      address:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],
      images:[''],
      pinCode:['',[Validators.required, Validators.pattern("^[0-9]*$"),Validators.max(6)]]

     })



     this.stateService.getState().subscribe(res=>{
      this.State = res;
      })
}
 get statusName() {
    return this.proprtyForm.get('status');
  }

  addProperty(){
    const formData = new FormData();
    formData.append('pTitle', this.proprtyForm.get('pTitle')?.value);
    formData.append('status', this.proprtyForm.get('status')?.value);
    formData.append('type', this.proprtyForm.get('type')?.value);
    formData.append('price', this.proprtyForm.get('price')?.value);
    formData.append('area', this.proprtyForm.get('area')?.value);
    formData.append('badRoomCount', this.proprtyForm.get('badRoomCount')?.value);
    formData.append('bathRoomCount', this.proprtyForm.get('bathRoomCount')?.value);
    formData.append('address', this.proprtyForm.get('address')?.value);
    formData.append('city', this.proprtyForm.get('city')?.value);
    formData.append('state', this.proprtyForm.get('state')?.value);
    formData.append('pinCode', this.proprtyForm.get('pinCode')?.value);
    formData.append('images', this.proprtyForm.get('images')?.value);

    for  (var i =  0; i <  this.files.length; i++)  {
      formData.append("images",  this.files[i]);
  }



  this.proService.addProperty(formData).subscribe(
      res=>{
        if(res.msg==="Data Added Successfully!!!"){
          this.router.navigate(['/property/view']);
          this.proprtyForm.reset()
        }
        else{
          this.router.navigate(['/property']);
          this.errorMessage = "Please Provide Valid Details!!!."
        }

      },err=>{

         this.errorMessage = err
      })
  }

  cancleProprty(){
    this.proprtyForm.reset()
  }

  onFileSelect(event:any) {

    for  (var i =  0; i <  event.target.files.length; i++)  {

      this.files.push(event.target.files[i]);


  }
}

onstateSelect(e:any){

this.stateService.stateWiseCity(e.target.value).subscribe(res=>{
  this.City = res;

})
}



}






