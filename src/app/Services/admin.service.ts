import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class AdminService {

  constructor(private httpClient: HttpClient) { }

  checkUser(userName: string) {
    return this.httpClient.get(environment.baseUrl + "user/checkUsername?userName=" + userName)
  }

  createUser(form: NgForm) {

    var formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('department', form.value.departement)
    formData.append('post', form.value.post)
    formData.append('userName', form.value.userName)
    formData.append('phoneNumber', form.value.phoneNumber)
    formData.append('employeeNumber', form.value.employeeNumber)
    formData.append('roleId', form.value.roleId)
    formData.append('password', form.value.password)
    return this.httpClient.post<boolean>(environment.baseUrl + "user/register", formData)
  }

}
