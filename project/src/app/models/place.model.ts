export class Place {
    public constructor(public placeId:string,
        public lat:number,
        public lng:number,
        public displayName:string,
        public icon:string = "",
        public rating:string = ""){}          
}