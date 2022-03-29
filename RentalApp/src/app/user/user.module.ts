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
import { UpdateProfile } from './pages/updateProfile/updateProfile.componant';
import { forgetPasswordComponant } from './pages/forgetPassword/forgetPassword.componant';
import { ResetPasswordComponant } from './pages/resetPassword/resetPassword.componant';
import { ChangePasswordComponant } from './pages/changePassword/chagePassword.componant';


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
    propertyDetailComponent,
    UpdateProfile,
    forgetPasswordComponant,
    ResetPasswordComponant,
    ChangePasswordComponant
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
      forgetPasswordComponant,
      ResetPasswordComponant,
      ChangePasswordComponant,

      SharedModule,
      CommonModule,
      UserRoutingModule,
      UpdateProfile,
      NgxPaginationModule,
      Ng2SearchPipeModule
    ]
})
export class UserModule {}
