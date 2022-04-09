import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userDetail } from '../Entity/userDetail';
import { AdminService } from '../Services/admin.service';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  user !: userDetail
  subscription : any

  constructor(private loginService: LoginService, private adminService: AdminService) { }

  ngOnInit(): void {
    this.subscription = this.loginService.userDetail.subscribe(res => {
      this.user = res
    })
  }

  createUser(signUpForm: NgForm) {
    this.adminService.checkUser(signUpForm.value.userName).subscribe(res => {
      if (res) {
        this.adminService.createUser(signUpForm).subscribe(res => {
          if (res)
            confirm("Account Created.")
          else
            confirm("Error occurred while creating the account...")
        })
      } else {
        confirm("UserName already in Use . Try with Different One...")
      }
    })
  }

  onLogOut() {
    this.loginService.logOut()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
