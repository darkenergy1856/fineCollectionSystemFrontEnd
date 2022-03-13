import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Ticket } from '../Entity/ticket';

@Injectable({
  providedIn: 'root'
})
export class PublicAccessService {
  constructor(private httpClient : HttpClient) { }

  getTicketEmail(emailId : string){
    return this.httpClient.get<Ticket[]>(environment.baseUrl + "ticketService/getTicketUsingEmail?email=" + emailId)
  }

  getTicketPhoneNumber(phoneNumber : number){
    return this.httpClient.get<Ticket[]>(environment.baseUrl + "ticketService/getTicketUsingPhoneNumber?phoneNumber=" + phoneNumber)
  }

  getTicketUsingId(id : string){
    return this.httpClient.get<Ticket>(environment.baseUrl + "ticketService/getTicket?ticketId=" + id)
  }

}
