import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../user/pages/login/login.component';
import { RegisterComponent } from '../user/pages/register/register.component';
import { UserComponent } from './user.component';
import { DashbourdComponent } from './pages/dashbourd/dashbourd.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.componant';
import { LayoutComponent } from './layout/layout.component';
import { UserRoutingModule } from './user.routing';
import { SharedModule } from '../shared/shared.module';

import { ConatactUsComponent } from './pages/contactUs/contactUs.componant';
import { PropertyComponent } from './pages/property/proprerty.componant';
import { PropertyViewComponent } from './pages/property/propertyView/propertyView.componant';
import { propertyListComponent } from './pages/propertyList/propertList.componant';
import { propertyDetailComponent } from './pages/ProperyDetails/propertyyDetails.componant';
import { NgxPaginationModule } from 'ngx-pagination';

import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    FooterComponent,
    DashbourdComponent,
    LoginComponent,
    RegisterComponent,
    LayoutComponent,
    ConatactUsComponent,
    PropertyComponent,
    PropertyViewComponent,
    propertyListComponent,
    propertyDetailComponent

  ],
  imports: [
    SharedModule,
    CommonModule,
    UserRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule

   ],
    exports: [
      UserComponent,
      HeaderComponent,
      FooterComponent,
      DashbourdComponent,
      LoginComponent,
      RegisterComponent,
      LayoutComponent,
      ConatactUsComponent,
      PropertyComponent,
      PropertyViewComponent,
      propertyListComponent,
      propertyDetailComponent,

      SharedModule,
      CommonModule,
      UserRoutingModule,

      NgxPaginationModule,
      Ng2SearchPipeModule
    ]
})
export class UserModule { }
