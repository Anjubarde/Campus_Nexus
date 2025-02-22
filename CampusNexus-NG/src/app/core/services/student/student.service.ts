import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://localhost:8080/api/student';

  constructor(private http: HttpClient) {}

  registerStudent(studentData: any): Observable<any> {
    return this.http.post(this.baseUrl + '/register', studentData);
  }

  getProfile(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/student-edit/${id}`);
  }

  updateProfile(data: any, id: number): Observable<any> {
    return this.http.put<any>(this.baseUrl + `/update/${id}`, data);
  }

  getStudentByRegisterNo(res_id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/find/${res_id}`);
  }

  getStudentAllData(id: number): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/student-data/${id}`);
  }

  getAllStudent(): Observable<any> {
    return this.http.get<any>(this.baseUrl + `/all/`);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(this.baseUrl + `/delete/${id}`);
  }
}
