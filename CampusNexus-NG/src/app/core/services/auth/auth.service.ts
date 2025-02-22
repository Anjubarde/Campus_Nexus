import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  //login request
  studentLogin(credentials: {
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(this.baseUrl + '/student/login', credentials);
  }

  //user login
  userLogin(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.baseUrl + '/user/login', credentials);
  }
}
