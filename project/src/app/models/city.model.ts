export class City{
    constructor(private id:string ,private name:string){}

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }
}