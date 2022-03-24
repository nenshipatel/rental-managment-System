
import { State } from "./stateModel"

export interface City{
  _id: string,
  cityName:string,
  state: State,
  images:[
    {
        fieldname:string,
        originalname:string,
        encoding:string,
        mimetype:string,
        destination:string,
        filename:string,
        path:string,
        size:string,

  }] ,
  isDeleted: boolean
}
