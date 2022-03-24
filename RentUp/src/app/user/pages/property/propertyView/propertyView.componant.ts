import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PropertyService } from 'src/app/shared/property.service';
import { StateService } from 'src/app/shared/state.service';
@Component({
  selector: 'app-property-view',
  templateUrl: './propertyView.html',

})
export class PropertyViewComponent implements OnInit {

  public City :any=[];
  public State :any=[];
  public pro: any =[];
  public proEdit : any| undefined=[]
  displayStyledelete="none"
  displayStyle = "none";
  public proprtyEditForm !: FormGroup;
  files:string  []  =  [];
  id!:string;
  constructor(private formBuilder: FormBuilder,
    private proService : PropertyService,
    private router: Router,
    private statService : StateService) { }

  ngOnInit(): void {
  this.proService.getProperty().subscribe(res=>{
    this.pro=res

    this.statService.gretCity().subscribe(res=>{
      this.City = res;

    })

    this.statService.getState().subscribe(res=>{
     this.State = res;
     })

  })



  this.proprtyEditForm= this.formBuilder.group({
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

}

openDeletePopup(id:any) {
  this.id=id;
  this.displayStyledelete= "block";

}
closeDeletePopup() {
  this.displayStyledelete= "none";
}


openPopup(id:any) {

  this.id=id;
  this.proService.getPropertById(id).subscribe(res=>{


    this.proprtyEditForm.setValue({
      pTitle:res.pro.pTitle,
      status:res.pro.status,
      type:res.pro.type,
      price:res.pro.price,
      area:res.pro.area,
      badRoomCount:res.pro.badRoomCount,
      bathRoomCount:res.pro.bathRoomCount,
      address:res.pro.address,
      city:res.pro.city,
      state:res.pro.state,
      images:res.pro.images,
      pinCode:res.pro.pinCode,

   });
   this.displayStyle= "block";
   })


}
closePopup() {
  this.displayStyle= "none";
}

delete(i:any) {

   this.proService.deleteProperty(this.id).subscribe((res) => {
      this.pro.splice(i, 1);
      this.displayStyledelete= "none";
    })

}

editProperty(){

  const formData = new FormData();

  formData.append('pTitle', this.proprtyEditForm.get('pTitle')?.value);
  formData.append('status', this.proprtyEditForm.get('status')?.value);
  formData.append('type', this.proprtyEditForm.get('type')?.value);
  formData.append('price', this.proprtyEditForm.get('price')?.value);
  formData.append('area', this.proprtyEditForm.get('area')?.value);
  formData.append('badRoomCount', this.proprtyEditForm.get('badRoomCount')?.value);
  formData.append('bathRoomCount', this.proprtyEditForm.get('bathRoomCount')?.value);
  formData.append('address', this.proprtyEditForm.get('address')?.value);
  formData.append('city', this.proprtyEditForm.get('city')?.value);
  formData.append('state', this.proprtyEditForm.get('state')?.value);
  formData.append('pinCode', this.proprtyEditForm.get('pinCode')?.value);


  for  (var i =  0; i <  this.files.length; i++)  {
    formData.append("images",  this.files[i]);
}




this.proService.editProprty(formData,this.id).subscribe(
    res=>{
    this.router.navigate(['/property/view']);

  })
  this.displayStyle= "none";
}


onFileSelect(event:any) {
for  (var i =  0; i <  event.target.files.length; i++)  {
   this.files.push(event.target.files[i]);
}

}
}
