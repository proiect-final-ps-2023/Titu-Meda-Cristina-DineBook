import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact/contact.service';
import { ContactMessage } from '../models/contact-message.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  saveForm!: FormGroup;

  constructor(private contactService: ContactService,
    private formBuilder: FormBuilder,
    private loc: Location) {}

    ngOnInit(): void {
      this.saveForm = this.formBuilder.group({
        name: [''],
        email: [''],
        message: ['']
      });
    }
    
    back(): void {
      this.loc.back();
    }
  saveContactMessage() {
      console.log(this.saveForm?.getRawValue());
      this.contactService.saveMessage(this.saveForm?.getRawValue()).subscribe(
      (response: ContactMessage) => {
        console.log(JSON.stringify(response));
      }
    ), (error: HttpErrorResponse) => {
      console.log(error.message);
      alert(error.message);
    }
  }
}
