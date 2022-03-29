import { State } from "./stateModel"
import {City} from "./cityModel"
export interface Property{
  _id?: string,
  pTitle?:string,

   status ?: string,
    type ?: string,
    price ?: number,
    area ?: string,
    badRoomCount ?: number,
    bathRoomCount ?: number,
    address ?: string,
    city?: City,
    state ?: State,
    pinCode ?: number,
  images?:[
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
  owner:{

    _id : string
    name :string
    email : string
    password: string,
    mno :number,
    isDeleted : boolean,
    "tokens" : [
        {}
    ],
  },
  isDeleted: boolean
}
