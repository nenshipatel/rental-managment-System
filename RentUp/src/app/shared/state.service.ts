import { Injectable } from "@angular/core";
import { HttpClient ,HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable , throwError} from "rxjs";
import { pipe , catchError ,retry } from "rxjs";
import { State } from "./Models/stateModel";
import { City } from "./Models/cityModel";
@Injectable({providedIn:"root"})
export class StateService{

    private _url="http://localhost:3000/"
    constructor(private http:HttpClient,
      private router : Router){}
      errorMsg!: string;
    addState(state: State):Observable<any>{
      return this.http.post<any>(`${this._url}state`,state)
    }

    getState():Observable<State[]>{
      return this.http.get<any>(`${this._url}state`)
    }


    deleteState(id: string): Observable<any> {
     return this.http.delete(`${this._url}state/delete/${id}`)

    }

    updateState(id:string,state:State):Observable<any>{
      return this.http.put(`${this._url}state/edit/${id}`,state);
    }

    getStateById(id:string):Observable<any>{
      return this.http.get(`${this._url}state/${id}`).pipe(
        catchError(error => {

            if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Error: ${error.error.message}`;
            } else {
                this.errorMsg = this.getServerErrorMessage(error);
            }

            return throwError(this.errorMsg);
        })
    );
    }



    addCity(city:any){
      return this.http.post<any>(`${this._url}city`,city)
    }

    gretCity():Observable<any>{
      return this.http.get<any>(`${this._url}city`)
    }

    deleteCity(id: string): Observable<any> {
      return this.http.delete(`${this._url}city/delete/${id}`)

     }


     getCityById(id:string):Observable<any>{
      return this.http.get(`${this._url}city/${id}`).pipe(
        catchError(error => {

            if (error.error instanceof ErrorEvent) {
                this.errorMsg = `Error: ${error.error.message}`;
            } else {
                this.errorMsg = this.getServerErrorMessage(error);
            }

            return throwError(this.errorMsg);
        })
    );
    }

   stateWiseCity(id:string){
    return this.http.get(`${this._url}statebyCity/${id}`);
   }
    updateCity(id:string,city:any):Observable<any>{
      return this.http.put(`${this._url}city/edit/${id}`,city);
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



