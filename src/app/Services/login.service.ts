import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoggedInUser } from '../Entity/logged-in-user';
import { userDetail } from '../Entity/userDetail';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';


export interface AuthResponseData {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: string;
  scope: string;
  jti: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string = ''

  authority = new BehaviorSubject<string>('')

  private tokenExpirationTimer: any

  emptyLoggedInUser: LoggedInUser = new LoggedInUser('', '', new Date, '')

  currentUser = new BehaviorSubject<LoggedInUser>(this.emptyLoggedInUser);

  emptyUserDetail: userDetail = {
    id: 0,
    name: '',
    department: '',
    post: '',
    userName: '',
    phoneNumber: '',
    employeeNumber: ''
  }

  userDetail = new BehaviorSubject<userDetail>(this.emptyUserDetail)

  constructor(private httpClient: HttpClient, private router: Router) { }

  setUserNameAndPassword(userName: string, password: string) {

    const formData = new FormData();

    formData.append('username', userName)
    formData.append('password', password)
    formData.append('grant_type', 'password')

    this.httpClient.post<AuthResponseData>(environment.baseUrl + 'oauth/token', formData, {
      headers: new HttpHeaders({ Authorization: "Basic " + btoa(environment.clientUsername + ':' + environment.clientPassword) })
    }).subscribe(response => {
      this.token = response.access_token
      this.getLoginAuthority(userName).subscribe(authority => {
        this.authority.next(authority)
        const expires_in = new Date(new Date().getTime() + + response.expires_in * 1000)
        const user = new LoggedInUser(userName, response.access_token, expires_in, authority)
        this.currentUser.next(user)
        this.getUserDetail(userName).subscribe(res => {
          this.userDetail.next(res)
        })
        this.autoLogout(+response.expires_in * 1000)
        localStorage.setItem('userAuth', JSON.stringify(user))
        if (authority === 'AUTHORITY') {
          this.router.navigateByUrl("/authority")
        }
        if (authority === 'ADMIN') {
          this.router.navigateByUrl("/admin")
        }

      })
    }, error => {
      alert(error.error.error_description)
    })
  }

  getLoginAuthority(userName: string) {
    return this.httpClient.get(environment.baseUrl + "user/getAccess?userName=" + userName, { responseType: 'text' })
  }

  getToken(): string {
    return this.token
  }

  private getUserDetail(userName: string) {
    return this.httpClient.get<userDetail>(environment.baseUrl + "user/getDetail?userName=" + userName)
  }

  autoLogin() {
    if (localStorage.getItem('userAuth') != null) {
      const tempUser: {
        userName: string,
        _token: string,
        _expirationDate: string,
        _authorizationType: string,
      } = JSON.parse(localStorage.getItem('userAuth')!)
      const LoggedIn = new LoggedInUser(tempUser.userName, tempUser._token, new Date(tempUser._expirationDate), tempUser._authorizationType)
      if (LoggedIn.token) {
        this.authority.next(LoggedIn.authorizationType)
        const remainingDuration = new Date(tempUser._expirationDate).getTime() - new Date().getTime()
        this.autoLogout(remainingDuration)
        this.currentUser.next(LoggedIn)
        this.getUserDetail(tempUser.userName).subscribe(res => {
          this.userDetail.next(res)
        })
        this.token = LoggedIn.token
        if (LoggedIn.authorizationType === 'AUTHORITY') {
          this.router.navigateByUrl("/authority")
        }
        if (LoggedIn.authorizationType === 'ADMIN') {
          this.router.navigateByUrl("/admin")
        }
      }
      else
        return;
    }
  }


  autoLogout(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut()
    }, expirationTime)
  }

  logOut() {
    this.currentUser.next(new LoggedInUser('', '', new Date(), ''))
    this.token = ''
    localStorage.removeItem('userAuth')
    this.router.navigateByUrl("/")

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer)
    }

    this.tokenExpirationTimer = null
  }

}
