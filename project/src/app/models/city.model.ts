import { Place } from "./place.model";

export class City{
    constructor(public id:string 
                    ,public name:string,
                    public lat:number = 0,
                    public lng:number = 0 ,
                    public savedPlaces:Place[] = null,
                    public photos:{small:string,large:string}[] = null
                    ){}

}