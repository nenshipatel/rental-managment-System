import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Router } from "@angular/router";

@Injectable({providedIn:"root"})
export class ContactService{

    private _url="http://localhost:3000/"
    constructor(private http:HttpClient,
      private router : Router){}

      addContactData(contact:any){
        return this.http.post<any>(`${this._url}conatct`,contact)
      }

      getContactdata(){
        return this.http.get<any>(`${this._url}contact`)
      }

      deleteContactdata(id:any){
        return this.http.delete<any>(`${this._url}contact/delete/${id}`)
      }
}
