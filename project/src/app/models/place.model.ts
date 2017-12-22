export class Place {
    public constructor(public placeId:string,
        public lat:number,
        public lng:number,
        public displayName:string,
        public address:string = "",
        public photos:{small:string,large:string}[] = null){}          
}