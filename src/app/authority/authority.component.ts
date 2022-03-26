import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userDetail } from '../Entity/userDetail';
import { Ticket } from '../Entity/ticket';
import { LoginService } from '../Services/login.service';
import { AuthorityService } from '../Services/authority.service';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent implements OnInit, OnDestroy {
  user !: userDetail

  constructor(private loginService: LoginService , private authorityService : AuthorityService) {}

  ngOnInit(): void {
    this.loginService.userDetail.subscribe(res => {
      this.user = res
    })
  }

  createTicket(form: NgForm) {
    var date = new Date().toLocaleDateString("en-US", {
      "year": "numeric",
      "month": "numeric",
      "day": "numeric"
    })
    var dueDate = new Date()
    dueDate.setDate(dueDate.getDate() + form.value.timePeriod)
    const temp = dueDate.toLocaleDateString("en-US", {
      "year": "numeric",
      "month": "numeric",
      "day": "numeric"
    })
    var ticket: Ticket = {
      name: form.value.name,
      emailId: form.value.email,
      phoneNumber: form.value.phoneNumber,
      actualDate: date.toString(),
      pinCode: form.value.pinCode,
      issuingAuthority: this.user.department,
      reason: form.value.reason,
      amount: form.value.amount,
      itemIdentification: form.value.itemIdentification,
      dueDate: temp
    }
    this.authorityService.generateTicket(ticket).subscribe(res=>{
      confirm(res)
    })
  }

  onLogOut() {
    this.loginService.logOut()
  }

  ngOnDestroy(): void {
    this.loginService.userDetail.unsubscribe()
  }

}
