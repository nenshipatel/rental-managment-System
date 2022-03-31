
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
import { UpdateProfile } from './pages/updateProfile/updateProfile.componant';
import { forgetPasswordComponant } from './pages/forgetPassword/forgetPassword.componant';
import { ResetPasswordComponant } from './pages/resetPassword/resetPassword.componant';
import { ChangePasswordComponant } from './pages/changePassword/chagePassword.componant';
import { MyAccountComponent } from './pages/myAccount/myAccount.componant';
const routes: Routes = [
      {path:'',component:UserComponent,
    children:[
      {path:'',component:DashbourdComponent},
      {path:'dashboard',component:DashbourdComponent},
      {path:'register',component:RegisterComponent},
      {path:'login',component:LoginComponent},

      {path:'conatctus', component:ConatactUsComponent },
      {path:'propertyList', component:propertyListComponent , canActivate : [AuthGuard] },
      {path:'propertyList/:id', component:propertyListComponent , canActivate : [AuthGuard]},
      {path:'propertyDetails/:id', component:propertyDetailComponent, canActivate : [AuthGuard]},
       {
        path:'myAccount',component:MyAccountComponent , canActivate:[AuthGuard],
        children:[
      
          {path:'upadteProfile', component:UpdateProfile} ,
          {path:'property',component:PropertyComponent},
          {path:'property/view',component:PropertyViewComponent },
          {path:'changePassword', component:ChangePasswordComponant},
        ]
      },
    ]},
    {path:'forgetPassword', component:forgetPasswordComponant},
    {path:'resetPassword/:id', component:ResetPasswordComponant},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
