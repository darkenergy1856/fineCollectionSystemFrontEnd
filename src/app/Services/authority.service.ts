import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userDetail } from '../Entity/userDetail';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {
  emptyUser : userDetail = {
    name:'',
    id: 0,
    department: '',
    post: '',
    userName: '',
    phoneNumber: '',
    employeeNumber: ''
  }

  userDetail = new BehaviorSubject<userDetail>(this.emptyUser)
 

  constructor(private httpClient : HttpClient , private loginService : LoginService) { }

  getUserDetail(){}
}
