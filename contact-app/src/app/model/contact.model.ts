/**
 * Contact Model consisting of all contactt details
 */
export class Contact{

    _id:String;
    FirstName:String;
    LastName:String;
    email:String;
    phone:String;

    constructor( _id:String, FirstName:String, LastName:String, email:String, phone:String ){
        this._id = _id;
        this.FirstName = FirstName;
        this.LastName = LastName;
        this.email = email;
        this.phone = phone;
    }
}