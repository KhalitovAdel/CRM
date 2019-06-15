import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/SERVICES/http/http.service';
import { AuthGuard } from 'src/app/SERVICES/authguard/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {
  errMessage: String = '';

  userInfo = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private ca: AuthGuard
  ) { }

  ngOnInit() {

    this.ca.isAuterizaded();

    this.userInfo.valueChanges
      .subscribe(value=> {
        this.errMessage = ''
      })
  }

  login() {
    if ( this.verify() ) {
      this.http.postHTTP('/public/login', this.userInfo.value)
        .subscribe( (data: any) => {
          localStorage.setItem('_ui', data.data);
        }, err => {
          //console.log(err)
          this.errMessage = 'Неправильное имя или пароль';
        })
    } else {
      this.errMessage = 'Заполните все поля'
    }
  }

  verify() {
    return this.userInfo.valid;
  }

}
