import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactMessage } from 'src/app/models/contact-message.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  baseURL: string = 'http://localhost:8080/contact-messages';

  constructor(private httpClient: HttpClient) { }

  public saveMessage(contactMessage: ContactMessage): Observable<ContactMessage> {
    let header = new HttpHeaders()
      .set('Content-Type', 'application/json')
    return this.httpClient.post<ContactMessage>(this.baseURL, contactMessage, {headers:header});
  }
}
