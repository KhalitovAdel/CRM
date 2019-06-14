import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'CRM';
  email = 'adelkhalitov1@gmail.com';
  password = 'adelADEL131';

  constructor(private http: HttpClient) {}
  
  register() {
    this.http.post('http://localhost:3001/public/registration', {email: this.email, password: this.password}, {
      withCredentials: true
   })
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err)
      })
  }

  login() {
    this.http.post('http://localhost:3001/public/login', {email: this.email, password: this.password}, {
      withCredentials: true
   })
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err)
      })
  }
}
