import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private baseUrl = 'http://localhost:8080/api/job-postings';
  private jobApplyBaseUrl = 'http://localhost:8080/api/job-applications/';
  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<any> {
    return this.http.get(this.baseUrl + '/all');
  }

  getJobInfo(id: any): Observable<any> {
    return this.http.get(this.baseUrl + '/find/' + id);
  }

  getActiveJobs(): Observable<any> {
    return this.http.get(this.baseUrl + '/active/');
  }

  updateJob(userId: number, jobId: number, jobData: any): Observable<any> {
    return this.http.put(this.baseUrl + `/update/${userId}/${jobId}`, jobData);
  }

  createJobPosting(jobData: any, userId: number): Observable<any> {
    return this.http.post(this.baseUrl + `/create/${userId}`, jobData);
  }

  // Job Appliation Services

  applyForJob(
    studentRegisterNo: number,
    jobPostingId: number
  ): Observable<any> {
    return this.http.post(
      this.jobApplyBaseUrl + `apply/${studentRegisterNo}/${jobPostingId}`,
      null
    );
  }

  getAppliedJobsByStudent(studentRegisterNo: number): Observable<any> {
    return this.http.get(this.jobApplyBaseUrl + `student/${studentRegisterNo}`);
  }
}
