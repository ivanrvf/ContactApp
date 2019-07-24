import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Contact } from '../model/contact.model';
import { HttpService } from '../service/http.service';
import { ContactComponent } from '../contact/contact.component';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input() contacts:Contact[];
  contactComponent: ContactComponent;
  //@Output() newContactEmitted = new EventEmitter();
  /**
   * Created Contact form group to group all contacts
   */
  contactForm = new FormGroup({
    FirstName : new FormControl('',[Validators.required, Validators.minLength(3)] ),
    LastName : new FormControl('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required, Validators.email] ),
    phone: new FormControl('',[Validators.required, Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}') ])
  });

  /**
   * Http service
   */
  httpService: HttpService;
  
  constructor(httpService: HttpService, contactComponent: ContactComponent) { 
    this.httpService = httpService;
    this.contactComponent = contactComponent;
  }

  ngOnInit() {
    console.log(this.contacts);
  }

  /**
   * Function to submit contact details
   */
  onSubmit = () => {

    let firstName : String = this.contactForm.get("FirstName").value;
    let lastName : String = this.contactForm.get("LastName").value;
    let email : String = this.contactForm.get("email").value;
    let phone : String = this.contactForm.get("phone").value;
    let contact: Contact = new Contact(null,firstName,lastName,email,phone);
    
    this.httpService.createContacts(contact).subscribe( response => {
      console.log('Contact:');
      console.log(response);
      //this.newContactEmitted.emit(response);
      this.contactComponent.ngOnInit();
    });

  }
}
