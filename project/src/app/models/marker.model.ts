import { Place } from "./place.model";

export class Marker{
    constructor(
                public place:Place,
                public isNew:boolean,
                public showInfoWindow:boolean){

                }
}

