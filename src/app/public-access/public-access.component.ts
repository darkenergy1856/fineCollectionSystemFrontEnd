import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ticket } from '../Entity/ticket';
import { PublicAccessService } from '../Services/public-access.service';

@Component({
  selector: 'app-public-access',
  templateUrl: './public-access.component.html',
  styleUrls: ['./public-access.component.css']
})
export class PublicAccessComponent implements OnInit {

  ticket: Ticket[] = []

  constructor(private publicAccess: PublicAccessService, private router: Router) { }

  ngOnInit(): void {
  }

  search(form: NgForm) {
    if (form.value.SearchCriteria === '1')
      this.publicAccess.getTicketUsingId(form.value.ticket).subscribe(res => {
        this.ticket[0] = res
        if (!!res)
          this.router.navigateByUrl("ticketStatus/" + this.ticket[0].id)
        else
          confirm("Ticket Dosn't exist with given ID")
      })
    if (form.value.SearchCriteria === '2')
      this.publicAccess.getTicketPhoneNumber(form.value.ticket).subscribe(res => {
        this.ticket = res
      })
    if (form.value.SearchCriteria === '3')
      this.publicAccess.getTicketEmail(form.value.ticket).subscribe(res => {
        this.ticket = res
      })
    form.reset()
  }

  checkStatus(id: number) {
    if (!!id) {
      this.router.navigateByUrl("ticketStatus/" + id)
    } else {
      confirm("Ticket Dosn't exist with given ID")
    }
  }

}
