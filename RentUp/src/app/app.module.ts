import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule ,  HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthGuard } from './shared/auth.guard';
import { AuthInterceptorServiceService } from './shared/auth-interceptor.service.service';

import { UserModule } from './user/user.module';


import { AdminModule } from './admin/admin.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [ AppComponent,],
  imports: [
   AppRoutingModule,
   BrowserModule,
   HttpClientModule,
   AdminModule,
   UserModule,

   ],
    exports: [
      AppComponent,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      UserModule,
      AdminModule

   ],
  providers: [AuthGuard,
  {
    provide:HTTP_INTERCEPTORS,
    useClass : AuthInterceptorServiceService,
    multi:true
  }],
  bootstrap: [AppComponent],

})
export class AppModule{}
