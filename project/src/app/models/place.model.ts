export class Place {
    public constructor(private placeId:string,
                        private lat:string,
                        private lon:string,
                        public displayName:string,
                        private icon:string,
                        private rating:string){}

    getPlaceId = () =>  this.placeId;
    getLat = () =>  this.lat;
    getLon = () =>  this.lon;
    getDisplayName = () =>  this.displayName;
    getIcon = () =>  this.icon;
    getRating = () =>  this.rating;                    
}