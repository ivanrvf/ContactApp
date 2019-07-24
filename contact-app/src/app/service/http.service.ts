import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../model/contact.model';

/**
 * Call backend
 */
@Injectable()
export class HttpService{
    resource: string;
    url:string;

    constructor(private http:HttpClient){
        this.resource = 'contacts';
        this.url = `http://localhost:3000/${this.resource}`;
    }

    getContacts = (): Observable<Array<Contact>> =>{
        return this.http.get<Array<Contact>>(this.url);
    }

    createContacts = ( contact:Contact ):Observable<Contact> =>{
        return this.http.post<Contact>(this.url,contact);
    }

    getContactById = ( id:String ): Observable<Contact> =>{
        return this.http.get<Contact>(this.url +'/'+id);
    }
}