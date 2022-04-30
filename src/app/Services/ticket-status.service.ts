import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Ticket } from '../Entity/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketStatusService {

  constructor(private httpClient : HttpClient) { }

  getTicketStatus(ticketId : string){
    let headers = new HttpHeaders();
    headers = headers.set('skipAuth', 'true')
    return this.httpClient.get<Ticket>(environment.baseUrl + "ticketService/getTicket?ticketId=" + ticketId , {'headers': headers})
  }

  payTicket(ticketId :  string){
    let headers = new HttpHeaders();
    headers = headers.set('skipAuth', 'true')
    return this.httpClient.post(environment.baseUrl + "ticketService/updateTicket?ticketId=" + ticketId , '' , {responseType : 'text','headers' : headers})
  }
}
