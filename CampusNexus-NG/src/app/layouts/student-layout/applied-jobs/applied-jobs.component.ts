import { Component } from '@angular/core';
import { JobService } from 'src/app/core/services/job/job.service';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrls: ['./applied-jobs.component.css'],
})
export class AppliedJobsComponent {
  applications: any[] = [];
  isLoading = true;
  studentData: any;

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchAppliedJobs();
  }

  fetchAppliedJobs(): void {
    const storedData = localStorage.getItem('student_Data');
    if (storedData) {
      this.studentData = JSON.parse(storedData);
    }
    const registerNo = this.studentData.register_id;

    if (registerNo) {
      this.jobService.getAppliedJobsByStudent(registerNo).subscribe({
        next: (response) => {
          this.applications = response;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching applications:', error);
          this.isLoading = false;
          alert('Failed to fetch applied jobs. Please try again later.');
        },
      });
    }
  }

  // withdrawApplication(applicationId: number): void {
  //   if (confirm('Are you sure you want to withdraw this application?')) {
  //     this.studentService.withdrawApplication(applicationId).subscribe({
  //       next: () => {
  //         this.applications = this.applications.filter(app => app.applicationId !== applicationId);
  //         alert('Application withdrawn successfully');
  //       },
  //       error: (error) => {
  //         console.error('Error withdrawing application:', error);
  //         alert('Failed to withdraw application. Please try again.');
  //       }
  //     });
  //   }
  // }
}
