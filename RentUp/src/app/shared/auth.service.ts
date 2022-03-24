import { Injectable } from "@angular/core";

import { Observable , throwError } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient ,HttpErrorResponse } from "@angular/common/http";
import { pipe , catchError ,retry } from "rxjs";


@Injectable({providedIn:"root"})
export class AuthService{


  errorMsg!: string;


    private _url="http://localhost:3000/"
    constructor(private http:HttpClient,
      private router : Router){}

    UserRegister(user:any):Observable<any>{
      return this.http.post<any>(`${this._url}users`,user)
    }

    UserLogin(user:any):Observable<any>{
      return this.http.post<any>(`${this._url}users/login`,user)

    }

    getUsers(){
      return this.http.get<any>(`${this._url}users`)
    }

    deleteUser(id: any): Observable<any> {
      return this.http.delete(`${this._url}users/delete/${id}`)

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

    // Logout(){
    //   localStorage.removeItem('userData');

    //   this.router.navigate(['/login'])
    // }





    AdminLogin(admin:any){
      return this.http.post<any>(`${this._url}admin/login`,admin)
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
