import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private baseUrl = 'http://localhost:8080/api/job-applications';
  constructor(private http: HttpClient) {}

  getAllApplications(): Observable<any> {
    return this.http.get(this.baseUrl + '/all');
  }

  updateApplicationStatus(applicationId: number, status: any): Observable<any> {
    return this.http.put(
      this.baseUrl + `/${applicationId}/status/${status}`,
      null
    );
  }

  deleteApplication(applicationId: number): Observable<any> {
    return this.http.delete(this.baseUrl + `/delete/${applicationId}`);
  }
}
