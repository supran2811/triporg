export class City{
    constructor(private id:string 
                    ,private name:string,
                    private lat:number = 0,
                    private lng:number = 0 ,
                    ){}

    getId = () => this.id;
    getName = () => this.name;
    getLat = () => this.lat;
    getLng = () => this.lng;

}