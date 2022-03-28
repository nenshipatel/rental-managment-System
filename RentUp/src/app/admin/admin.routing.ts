
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminDashbourdComponent } from './pages/admin-dashbourd/admin-dashbourd.component';
import { AdminHeaderComponent } from './layout/header/header.component';
import { StateComponent } from './pages/state/state.component';
import { StateViewComponent } from './pages/state/StateView/stateView.componant';
import { AdminConatactUsComponent } from './pages/adminContact/adminContact.componant';
import { UsersViewComponent } from './pages/users/users.componant';
import { CityComponent } from './pages/city/city.component';
import { AdminCityViewComponent } from './pages/city/cityView/cityview.componant';
import { AdminProprtyComponent } from './pages/adminProperty/adminProperty.componant';
import { AdminAuthGuard } from '../shared/adminAuthgrurd';



const routes: Routes = [
  {path:'admin',component:AdminComponent,
  children: [

     {path:'dashboard',component:AdminDashbourdComponent,canActivate : [AdminAuthGuard]},

     {path: 'logout', component: AdminHeaderComponent,canActivate : [AdminAuthGuard]},
     {path:'state', component:StateComponent,
        children:[
          {path: 'edit/:id', component: StateComponent,canActivate : [AdminAuthGuard]},
          ]
    },
    {path:'state/view',component:StateViewComponent ,canActivate : [AdminAuthGuard]},
    {path:'contact',component:AdminConatactUsComponent ,canActivate : [AdminAuthGuard]},
    {path:'users', component:UsersViewComponent ,canActivate : [AdminAuthGuard]},
    {path:'city', component:CityComponent ,canActivate : [AdminAuthGuard]},
    {path:'city/view' , component: AdminCityViewComponent ,canActivate : [AdminAuthGuard]},
    {path:'property/view', component:AdminProprtyComponent ,canActivate : [AdminAuthGuard]},
  ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
