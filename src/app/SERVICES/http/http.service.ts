import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'my-auth-token'
  }), withCredentials: true
};

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  base_href:String = 'http://localhost:3001';

  constructor(
    private http: HttpClient
  ) { }

  postHTTP(url:string, info) {
    return this.http.post(this.base_href.concat(url), info, httpOptions);
  }
  getHTTP(url:string) {
    return this.http.get(this.base_href.concat(url), httpOptions);
  }
  putHTTP(url:string, info: any) {
    return this.http.put(this.base_href.concat(url), info, httpOptions);
  }

}
 