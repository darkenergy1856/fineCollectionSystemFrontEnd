import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ticket } from '../Entity/ticket';

@Injectable({
  providedIn: 'root'
})
export class PublicAccessService {

  constructor(private http : HttpClient) { }

  getTicketEmail(emailId : string) : Ticket[] {
    console.log("Inside ticket using Email")
    return
  }

  getTicketPhoneNumber(phoneNumber : )

}
