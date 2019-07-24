import { Component, OnInit } from '@angular/core';
import { Contact} from '../model/contact.model';
import { HttpService} from '../service/http.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  /**
   * List of initialized variables
   */
  contacts:Array<Contact>;
  contactFlag:Map<String,Contact> = new Map<String,Contact>();
  httpService: HttpService;
  contact: Contact;
  formView: any;
  constructor( httpService: HttpService) { 
    this.httpService = httpService;
    this.formView = "";
  }

  /**
   * Values to be initialized 
   */
  ngOnInit() {
    this.contact = null;
    this.httpService.getContacts().subscribe(( contacts) => {
      this.contacts = contacts;
      contacts.forEach( (contact) => {
         this.contactFlag.set(contact._id,null);
      });
    });
    
  }

  /**
   * Toggle to fetch and display contact details of each row.
   */
  toggle = (id):void => {
    console.log(this.contactFlag.get(id));
    console.log(this.contactFlag);
    if(this.contactFlag.get(id) === null){
      this.httpService.getContactById(id).subscribe( contact => {
        this.contactFlag.set(id, <Contact>contact);
      });
    }
    else{
      this.contactFlag.set(id, null);
    }
  }
  add = ():void => {
    if(this.formView === ""){
      this.formView = null;
    }
    else{
      this.formView = "";
    }
  }

}
