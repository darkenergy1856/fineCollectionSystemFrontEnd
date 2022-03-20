import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Ticket } from '../Entity/ticket';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  constructor(private httpClient: HttpClient) { }

  generateTicket(ticket: Ticket) {
    const formData = new FormData()
    formData.append('name', ticket.name)
    formData.append('phoneNumber', ticket.phoneNumber.toString())
    formData.append('pinCode', ticket.pinCode.toString())
    formData.append('issuingAuthority', ticket.issuingAuthority)
    formData.append('reason', ticket.reason)
    formData.append('amount', ticket.amount.toString())
    formData.append('dueDate', ticket.dueDate)
    formData.append('emailId', ticket.emailId)
    formData.append('actualDate', ticket.actualDate)
    formData.append('itemIdentification', ticket.itemIdentification)

    return this.httpClient.post(environment.baseUrl + "ticketService/createTicket", formData, { responseType: 'text' })
  }
}
