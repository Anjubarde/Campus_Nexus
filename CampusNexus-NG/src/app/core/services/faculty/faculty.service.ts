import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FacultyService {
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  registerCoordinator(credentials: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.http.post(this.baseUrl + '/register-coordinator', credentials);
  }

  varifyCoordinator(id: number): Observable<any> {
    return this.http.put(this.baseUrl + '/verify-coordinator/' + id, null);
  }

  updateUser(
    credentials: { name: string; email: string },
    id: number
  ): Observable<any> {
    return this.http.put(this.baseUrl + '/update/' + id, credentials);
  }

  deleteCoordinator(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/delete-coordinator/' + id);
  }

  getAllCoordinators(): Observable<any> {
    return this.http.get(this.baseUrl + '/all-coordinators');
  }

  // updateUserPassword(credentials: {id: number, password: string}):Observable<any> {
  //   return this.http.get(this.baseUrl + '/update-password', credentials);
  // }

  getStats(): Observable<any> {
    return this.http.get(this.baseUrl + '/stats');
  }
}
