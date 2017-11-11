export class User {
  constructor(private email:string , private fullName:string){}

  getEmail = () => this.email;

  getFullName = () => this.fullName;
}