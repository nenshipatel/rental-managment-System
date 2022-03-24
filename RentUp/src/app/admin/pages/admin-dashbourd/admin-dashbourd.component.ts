import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountService } from 'src/app/shared/Count.service';

@Component({
  selector: 'app-admin-dashbourd',
  templateUrl: './admin-dashbourd.component.html',
  styleUrls: ['./admin-dashbourd.component.css']
})
export class AdminDashbourdComponent implements OnInit {

  constructor(private countService : CountService,
   private router : Router) { }
public city_count!:number
public user_count!:number
public state_count!:number
public pro_count!:number
public feedback_count!:number
  ngOnInit(): void {

    this.countService.getCityCount().subscribe(res=>{
      this.city_count=res.city_count
    })


    this.countService.getFeedbackCount().subscribe(res=>{this.feedback_count=res.contact_count})
    this.countService.getPropertyCount().subscribe(res=>{this.pro_count=res.pro_count})
    this.countService.getStateCount().subscribe(res=>{this.state_count=res.state_count})
    this.countService.getUserCount().subscribe(res=>{this.user_count=res.users_count})
  }


 
}
