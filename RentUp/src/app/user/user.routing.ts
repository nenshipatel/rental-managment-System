
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { DashbourdComponent } from './pages/dashbourd/dashbourd.component';
import { UserComponent } from './user.component';
import {RegisterComponent} from '../user/pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PropertyComponent } from './pages/property/proprerty.componant';
import { propertyDetailComponent } from './pages/ProperyDetails/propertyyDetails.componant';
import { PropertyViewComponent } from './pages/property/propertyView/propertyView.componant';
import { ConatactUsComponent } from './pages/contactUs/contactUs.componant';
import { propertyListComponent } from './pages/propertyList/propertList.componant';
import { AuthGuard } from '../shared/auth.guard';
const routes: Routes = [
      {path:'',component:UserComponent,
    children:[
      {path:'',component:DashbourdComponent},
      {path:'dashboard',component:DashbourdComponent},
      {path:'register',component:RegisterComponent},
      {path:'login',component:LoginComponent},
      {path:'property',component:PropertyComponent ,canActivate : [AuthGuard]},
      {path:'property/view',component:PropertyViewComponent , canActivate : [AuthGuard] },
      {path:'conatctus', component:ConatactUsComponent },
      {path:'propertyList', component:propertyListComponent , canActivate : [AuthGuard] },
      {path:'propertyList/:id', component:propertyListComponent},
      {path:'propertyDetails/:id', component:propertyDetailComponent, canActivate : [AuthGuard]},

    ]}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
