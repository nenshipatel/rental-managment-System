import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin.routing';
import { AdminComponent } from './admin.component';
import { AdminHeaderComponent } from './layout/header/header.component';

import { AdminLayoutComponent } from './layout/layout.component';
import { AdminDashbourdComponent } from './pages/admin-dashbourd/admin-dashbourd.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminProprtyComponent } from './pages/adminProperty/adminProperty.componant';
import { StateComponent } from './pages/state/state.component';
import { CityComponent } from './pages/city/city.component';
import { StateViewComponent } from './pages/state/StateView/stateView.componant';
import { AdminCityViewComponent } from './pages/city/cityView/cityview.componant';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { AdminConatactUsComponent } from './pages/adminContact/adminContact.componant';
import { UsersViewComponent } from './pages/users/users.componant';
import { AdminChangePasswordComponent } from './pages/adminChangePassword/adminChangepassword.componant';

import { NgxPaginationModule } from 'ngx-pagination';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
  declarations: [
    AdminComponent,
    AdminHeaderComponent,
    AdminDashbourdComponent,
    AdminLoginComponent,
    AdminLayoutComponent,
    AdminConatactUsComponent,
    SidebarComponent,
    UsersViewComponent,
    AdminProprtyComponent,
    AdminCityViewComponent,
    StateComponent,
    StateViewComponent,
    CityComponent,
    AdminChangePasswordComponent

  ],
  imports: [
    SharedModule,
    CommonModule,
    AdminRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
   ],
    exports: [
      SharedModule,
      AdminComponent,
      AdminHeaderComponent,
      AdminDashbourdComponent,
      AdminLoginComponent,
      AdminLayoutComponent,
      AdminConatactUsComponent,
      SidebarComponent,
      UsersViewComponent,
      AdminProprtyComponent,
      AdminCityViewComponent,
      StateComponent,
      StateViewComponent,
      CityComponent,
      CommonModule,
      AdminRoutingModule,
      AdminChangePasswordComponent,
      NgxPaginationModule,
      Ng2SearchPipeModule
    ]
})
export class AdminModule { }

