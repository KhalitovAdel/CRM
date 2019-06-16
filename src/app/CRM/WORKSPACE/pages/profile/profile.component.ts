import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/SERVICES/http/http.service';
import { FbmethodsService } from 'src/app/SERVICES/fb/fbmethods.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.styl']
})
export class ProfileComponent implements OnInit {

  files: any;

  phoneMask = [ '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  dateMask = [ '.', /[1-9]/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]

  userBio = this.fb.group({
    Name: ['', Validators.required],
    Surname: ['', Validators.required],
    Patronymic: ['', Validators.required],
    birthDate: ['', Validators.required],
    tel: ['', Validators.required],
    email: ['', Validators.required],
    img: '',
  })


  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private fbmethods: FbmethodsService
    ) { }

  ngOnInit() {
    this.http.getHTTP('/crm/profile/get')
      .subscribe( (data: any)=> { //any
        this.fbmethods.updateValue(this.userBio, data);
      }, err => {
        //??
      })
    
    this.userBio.valueChanges.subscribe(value=>console.log(value))
  } //ngOnInit

  saveChanges() {
    if (this.userBio.valid) {
      this.http.putHTTP('/crm/profile/put', this.userBio.value)
        .subscribe(data=> {
          this.fbmethods.updateValue(this.userBio, data);
        }, err => {
          //??
        })
    }
  }

  addPhoto(event) { //Нужно сделать проферку на форматы
    let target = event.target || event.srcElement;
    this.files = target.files;
    let final_data;
    if (this.files) {

      let files: FileList = this.files;
      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append('photo', files[i]);
      }
      final_data = formData;
    }
    this.http.postHTTP('/crm/profile/img', final_data)
      .subscribe( (data: any)=> {

        this.userBio['controls'].img.setValue(data.path)

        console.log(data)
      }, err=> {
        console.log(err)
      })

  } //addPhoto

}
