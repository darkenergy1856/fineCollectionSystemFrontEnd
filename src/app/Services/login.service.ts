import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoggedInUser } from '../Entity/logged-in-user';
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

  authority = new  BehaviorSubject<string>('')

  private tokenExpirationTimer: any
  currentUser = new Subject<LoggedInUser>();

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
        const expires_in = new Date(new Date().getTime() + + response.expires_in * 1000);
        const user = new LoggedInUser(userName, response.access_token, expires_in, authority);
        this.currentUser.next(user);
        console.log(authority)
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

  // checkDetail(userName: string, doctorId: string) {
  //   return this.httpClient.get<boolean>(environment.baseUrl + 'doctorService/checkDoctor', { headers: { 'userName': userName, 'doctorId': doctorId } })
  // }

  // private getDetailsDoctor(userName: string) {
  //   return this.httpClient.get<Doctor>(environment.baseUrl + 'doctorService/detail?userName=' + userName)
  // }

  // private getDetailsPatient(userName: string) {
  //   return this.httpClient.get<Patient>(environment.baseUrl + 'patientService/patientDetail?userName=' + userName)
  // }


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
        this.token = LoggedIn.token
        if (LoggedIn.authorizationType === 'AUTHORITY') {
          console.log("Initial Redirecting")
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