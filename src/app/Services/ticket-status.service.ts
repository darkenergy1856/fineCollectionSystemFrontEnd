import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Ticket } from '../Entity/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketStatusService {

  constructor(private httpClient : HttpClient) { }

  getTicketStatus(ticketId : string){
    return this.httpClient.get<Ticket>(environment.baseUrl + "ticketService/getTicket?ticketId=" + ticketId)
  }

  payTicket(ticketId :  string){
    return this.httpClient.post(environment.baseUrl + "ticketService/updateTicket?ticketId=" + ticketId , '' , {responseType : 'text'})
  }
}
