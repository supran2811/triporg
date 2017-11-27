export class Place {
    public constructor(private placeId:string,
                        private lat:number,
                        private lng:number,
                        private displayName:string,
                        private icon:string,
                        private rating:string){}

    getPlaceId = () =>  this.placeId;
    getLat = () =>  this.lat;
    getLng = () =>  this.lng;
    getDisplayName = () =>  this.displayName;
    getIcon = () =>  this.icon;
    getRating = () =>  this.rating;                    
}