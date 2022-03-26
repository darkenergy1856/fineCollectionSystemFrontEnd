import { Component, OnInit , ViewEncapsulation  } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service'


interface user {
  email : string,
  password : string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit {

  private user = {} as user
    
  constructor(private loginService : LoginService , private route : Router ) { 
  }

  ngOnInit(): void {
  }

  login(form : NgForm){
    this.user = form.value
    this.loginService.setUserNameAndPassword(this.user.email, this.user.password)
    form.reset()
   }

}
