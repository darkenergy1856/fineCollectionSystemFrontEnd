import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Ticket } from '../Entity/ticket';

@Injectable({
  providedIn: 'root'
})
export class PublicAccessService {
  constructor(private httpClient : HttpClient) { }

  getTicketEmail(emailId : string){
    let headers = new HttpHeaders();
    headers = headers.set('skipAuth', 'true')
    return this.httpClient.get<Ticket[]>(environment.baseUrl + "ticketService/getTicketUsingEmail?email=" + emailId , {'headers': headers})
  }

  getTicketPhoneNumber(phoneNumber : number){
    let headers = new HttpHeaders();
    headers = headers.set('skipAuth', 'true')
    return this.httpClient.get<Ticket[]>(environment.baseUrl + "ticketService/getTicketUsingPhoneNumber?phoneNumber=" + phoneNumber,{'headers': headers})
  }

  getTicketUsingId(id : string){
    let headers = new HttpHeaders();
    headers = headers.set('skipAuth', 'true')
    return this.httpClient.get<Ticket>(environment.baseUrl + "ticketService/getTicket?ticketId=" + id,{'headers': headers})
  }

}
