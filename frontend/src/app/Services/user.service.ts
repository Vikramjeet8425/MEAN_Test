import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  base = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) { }

  login(data: any) {
    return this.http.post(`${this.base}/login`, data);
  }

  register(body: any) {
    return  this.http.post(`${this.base}/register`, body);
  }
}
