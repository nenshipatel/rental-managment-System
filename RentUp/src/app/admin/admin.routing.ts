
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
const routes: Routes = [
  {path:'admin',component:AdminComponent,
  children: [

     {path:'dashboard',component:AdminDashbourdComponent},

     {path: 'logout', component: AdminHeaderComponent,},
     {path:'state', component:StateComponent,
        children:[
          {path: 'edit/:id', component: StateComponent},
          ]
    },
    {path:'state/view',component:StateViewComponent},
    {path:'contact',component:AdminConatactUsComponent},
    {path:'users', component:UsersViewComponent},
    {path:'city', component:CityComponent},
    {path:'city/view' , component: AdminCityViewComponent},
    {path:'property/view', component:AdminProprtyComponent},
  ],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
