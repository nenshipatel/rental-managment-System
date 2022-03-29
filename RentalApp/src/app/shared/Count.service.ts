import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Router } from "@angular/router";

@Injectable({providedIn:"root"})
export class CountService{

    private _url="http://localhost:3000/"
    constructor(private http:HttpClient,
      private router : Router){}

      getCityCount(){
        return this.http.get<any>(`${this._url}city_count`)
      }
      getUserCount(){
        return this.http.get<any>(`${this._url}users_count`)
      }
      getStateCount(){
        return this.http.get<any>(`${this._url}state_count`)
      }
      getPropertyCount(){
        return this.http.get<any>(`${this._url}property_count`)
      }
      getFeedbackCount(){
        return this.http.get<any>(`${this._url}contact_count`)
      }

}
