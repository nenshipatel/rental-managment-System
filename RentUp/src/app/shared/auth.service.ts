import { Injectable } from "@angular/core";

import { Observable , throwError } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient ,HttpErrorResponse } from "@angular/common/http";
import { pipe , catchError ,retry } from "rxjs";


@Injectable({providedIn:"root"})
export class AuthService{


  private _url="http://localhost:3000/"
  errorMsg!: string;

  constructor(private http:HttpClient,
      private router : Router){}

    UserRegister(user:any):Observable<any>{
      return this.http.post<any>(`${this._url}users`,user)
    }

    UserLogin(user:any):Observable<any>{
      return this.http.post<any>(`${this._url}users/login`,user)

    }

    getUsers(limit:number){
      return this.http.get<any>(`${this._url}users?page=${limit}`)
    }

    deleteUser(id: any): Observable<any> {
      return this.http.delete(`${this._url}users/delete/${id}`)

     }


    forgetPassword(email : any){
      return this.http.get<any>(`${this._url}users/email?email=${email}`)
    }

    resetPassword(id:any,password:any){
      return this.http.put<any>(`${this._url}user/resetPassword/${id}`,password)
    }


    changePassword(changePass:any){
      return this.http.put<any>(`${this._url}user/cahngePassword`,changePass)
    }


     getLoggedInUser(){
      return this.http.get<any>(`${this._url}users/me`)
     }

    loggedIn(){
      return !!localStorage.getItem('userData')
    }
    adminloggedIn(){
      return !!localStorage.getItem('adminData')
    }
    getToken(){
      return localStorage.getItem('userData');
    }

    logout(user:any){

      return this.http.post<any>(`${this._url}users/logout`,user);

    }

   editProfile(user:any){
    return this.http.put<any>(`${this._url}user/edit`,user)
   }





    AdminLogin(admin:any){
      return this.http.post<any>(`${this._url}admin/login`,admin)
    }

    changeAdminPassword(changepassword:any){
      return this.http.put<any>(`${this._url}admin/cahngePassword/:id`,changepassword)
    }


    adminLogout(admin:any){

      return this.http.post<any>(`${this._url}admin/logout`,admin);

    }


    private getServerErrorMessage(error: HttpErrorResponse): string {
      switch (error.status) {
          case 404: {
              return `Not Found: ${error.message}`;
          }
          case 403: {
              return `Access Denied: ${error.message}`;
          }
          case 500: {
              return `Internal Server Error: ${error.message}`;
          }
          default: {
              return `Unknown Server Error: ${error.message}`;
          }

        }
      }



}
