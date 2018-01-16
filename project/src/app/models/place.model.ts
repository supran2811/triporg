export class Place {
    public constructor(public placeId:string,
        public lat:number,
        public lng:number,
        public displayName:string,
        public iconUrl:string,
        public address:string = null,
        public photos:{small:string,large:string}[] = null,
        public phoneNumber:string = null,
        public reviews : {text:string,author_name:string,profile_photo_url:string}[] = null,
        public opening_text : string[] = null,
        public website:string = null,
        public rating:number = 0){}          
}