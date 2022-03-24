import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { State } from 'src/app/shared/Models/stateModel';

import { StateService } from 'src/app/shared/state.service';
@Component({
  selector: 'app-stateView',
  templateUrl: './stateView.componant.html',

})
export class StateViewComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
    private stateService : StateService,
   private  router : Router,
   private route: ActivatedRoute) { }



  public stateEditForm!: FormGroup;
  public State: State[] =[];
  isError = false
  isAddMode= false;
  ErrorMessage !:string
  displayStyle = "none";
  displayStyledelete="none"
  id:any;

  openPopup(id:any) {

    this.id=id
    this.stateService.getStateById(id).subscribe(res => {
       this.stateEditForm.setValue({
        stateName: res.state.stateName
     });


    });
    this.displayStyle = "block";

  }
  closePopup() {
    this.displayStyle = "none";
  }


  ngOnInit(): void {

      this.stateEditForm  = this.formBuilder.group({
        stateName:['',Validators.required],
        })

      this.stateService.getState().subscribe(res => {

        this.State=res;
      });

  }



  openDeletePopup(id:any) {
    this.id = id
    this.displayStyledelete= "block";

  }
  closeDeletePopup() {
    this.displayStyledelete= "none";
  }

  delete(i:any) {
      this.stateService.deleteState(this.id).subscribe((res) => {
        this.State.splice(i, 1);
      })
      this.displayStyledelete = "none";
  }


updateState(id:any){

try{
  this.stateService.updateState(this.id, this.stateEditForm.value).subscribe(
    res=>{

      this.displayStyle = "none";
      this.stateEditForm.reset()
     this.router.navigate(['/admin/state/view'])
    },err=> {


      this.displayStyle = "none";
      if(err.status ===500){
        this.ErrorMessage= err.error.errorMessage
      }
    })
}
catch(e)
{
 return e;
}

}



}

