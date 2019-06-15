import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import * as CryptoJS from "crypto-js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  title = 'CRM';
  email = 'adelkhalitov1@gmail.com';
  password = 'adelADEL131';

  localStorName = '_ui'

  files: any;

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
      .subscribe( (data: any) => { //any

        var any = CryptoJS.AES.decrypt(data.data, 'secret secret secret secret');
        console.log( JSON.parse( any.toString(CryptoJS.enc.Utf8) ).email )

        localStorage.setItem(this.localStorName, data.data);
      }, err => {
        console.log(err)
      })
  }

  loginfail() {
    this.http.post('http://localhost:3001/public/login', {email: this.email, password: 'wdqwdqwd'}, {
      withCredentials: true
   })
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err)
      })
  }

  logout() {
    this.http.post('http://localhost:3001/public/logout', {}, {
      withCredentials: true
   })
      .subscribe(data => {
        localStorage.removeItem(this.localStorName);
      }, err => {
        console.log(err)
      })
  }


addPhoto(event) {
  let target = event.target || event.srcElement;
  this.files = target.files;
} 

submitRegister() {
  let final_data;
  if (this.files) {
    let files: FileList = this.files;
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append('photo', files[i]);
    }
    
    formData.append('data', JSON.stringify( {email: this.email, password: this.password} ));
    final_data = formData;
  } else {
    final_data = {email: this.email, password: this.password};
  }

  this.http.post('http://localhost:3001/public/submitRegister', final_data, {
      withCredentials: true
   })
      .subscribe(data => {
        console.log(data);
      }, err => {
        console.log(err)
      })
}


}
