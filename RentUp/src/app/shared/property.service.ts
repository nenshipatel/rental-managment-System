import { Injectable } from "@angular/core";
import { HttpClient ,HttpErrorResponse } from "@angular/common/http";

import { Router } from "@angular/router";
import { Observable , throwError} from "rxjs";
import { pipe , catchError ,retry } from "rxjs";
import { Property } from "./Models/propertyModel";
@Injectable({providedIn:"root"})
export class PropertyService{

    private _url="http://localhost:3000/"
    constructor(private http:HttpClient,
      private router : Router){}
      errorMsg!: string;


      addProperty(pro:any ):Observable<any>{
        return this.http.post<any>(`${this._url}property`,pro).pipe(catchError(this.getServerErrorMessage));
      }

      getProperty(limit:number){
        return this.http.get<Property[]>(`${this._url}property/me?page=${limit}`).pipe(catchError(this.getServerErrorMessage))
      }



      getAllProperty(){
        return this.http.get<Property[]>(`${this._url}property/all`).pipe(catchError(this.getServerErrorMessage))
      }

      getAllUserProperty(){
        return this.http.get<Property[]|string>(`${this._url}property/users/all`).pipe(catchError(this.getServerErrorMessage))
      }

      getListOfProperty(limit:number){
        return this.http.get<any>(`${this._url}property/List?page=${limit}`).pipe(catchError(this.getServerErrorMessage))
      }


      deleteProperty(id:string){
        return this.http.delete<any>(`${this._url}proprty/delete/${id}`);
      }


      editProprty(pro:any,id:string){
        return this.http.put<any>(`${this._url}property/edit/${id}`,pro);
      }

      getPropertById(id:string):Observable<any>{
        return this.http.get(`${this._url}property/${id}`).pipe(
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



      getallPropertyOtherThanme(){

        return this.http.get<Property[]>(`${this._url}property/all/list`);

      }

      getProprtyByCitysorted(id: string|null,limit:number,value:string):Observable<any>{
        return this.http.get<any>(`${this._url}propertybycity/${id}?page=${limit}&sort=sortBy:${value}&asc=1`);
      }


      getProprtyByCity(id:string,limit:number){
        return this.http.get<any>(`${this._url}propertybycity/${id}?page=${limit}`);
      }


     getSortedData(page:number,value:string):Observable<any>{
       return this.http.get<Property[]|number>(`${this._url}property/List?page=${page}&sort=sortBy:${value}&asc=1`)
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



