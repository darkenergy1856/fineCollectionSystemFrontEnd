import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Ticket } from '../Entity/ticket';
import { TicketStatusService } from '../Services/ticket-status.service';


@Component({
  selector: 'app-ticket-status',
  templateUrl: './ticket-status.component.html',
  styleUrls: ['./ticket-status.component.css']
})
export class TicketStatusComponent implements OnInit {

  ticket : Ticket = {
    id : 0,
    name: '',
    emailId: '',
    phoneNumber: 0,
    actualDate: '',
    pinCode: 0,
    issuingAuthority: '',
    itemIdentification: '',
    reason: '',
    amount: 0,
    dueDate: ''
  }
      
  ticketPaid: boolean = false
  ticketId : string = ''

  constructor(private activatedRoute: ActivatedRoute, private ticketStatusService: TicketStatusService) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(param => {
      this.ticketStatusService.getTicketStatus(param.get('ticketId')!).subscribe(res=>{
        this.ticket = res
        this.ticketId = param.get('ticketId')!
        this.ticketPaid = this.ticket.paid!
      })
    })
  }

  payTicket(){
    this.ticketStatusService.payTicket(this.ticketId).subscribe(res=>{
      confirm(res)
    })
  }

}
