import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userDetail } from '../Entity/userDetail';
import { Ticket } from '../Entity/ticket';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent implements OnInit, OnDestroy {
  user !: userDetail

  constructor(private loginService: LoginService) { }


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
      state: form.value.state,
      pinCode: form.value.pinCode,
      issuingAuthority: this.user.department,
      reason: form.value.reason,
      amount: form.value.amount,
      paid: false,
      dueDate: temp
    }
  }

  onLogOut() {
    this.loginService.logOut()
  }

  ngOnDestroy(): void {
    this.loginService.userDetail.unsubscribe()
  }

}
