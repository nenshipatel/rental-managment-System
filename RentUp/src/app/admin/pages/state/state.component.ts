import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';

import { StateService } from 'src/app/shared/state.service';
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
    private stateService : StateService,
   private  router : Router,
   private route: ActivatedRoute) { }


  public stateForm!: FormGroup;
  public stateEditForm!: FormGroup;
  public State: any =[];


  ErrorMessage !:string

  ngOnInit(): void {

    this.stateForm  = this.formBuilder.group({
      stateName:['',Validators.required],
      })


      this.stateEditForm  = this.formBuilder.group({
        stateName:['',Validators.required],
        })

      this.stateService.getState().subscribe(res => {

        this.State=res;
      });

  }


  state(){
    this.stateService.addState(this.stateForm.value).subscribe(
      res=>{

        this.router.navigate(['/admin/state/view'])
        this.stateForm.reset()
      },err=>{
          this.ErrorMessage=err.error.message
      }
    )
  }


}
