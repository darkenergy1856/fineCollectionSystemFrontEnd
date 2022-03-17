import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userDetail } from '../Entity/userDetail';
import { LoginService } from '../Services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit , OnDestroy {
  user !: userDetail

  constructor(private loginService : LoginService) { }
 

  ngOnInit(): void {
    this.loginService.userDetail.subscribe(res =>{
      this.user = res
    })
  }

  createAuthority(signUpForm : NgForm){
    console.log(signUpForm.value)
  }

  onLogOut(){
    this.loginService.logOut()
  }

  ngOnDestroy(): void {
    this.loginService.userDetail.unsubscribe()
  }

}
