import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ApplicationService } from 'src/app/core/services/application/application.service';
import { JobService } from 'src/app/core/services/job/job.service';

@Component({
  selector: 'app-manage-job-applications',
  templateUrl: './manage-job-applications.component.html',
  styleUrls: ['./manage-job-applications.component.css'],
})
export class ManageJobApplicationsComponent {
  jobPostings: any[] = []; // Holds job data
  applications: any[] = [];
  filteredApplications: any[] = [];
  searchTerm: string = '';

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.applicationService.getAllApplications().subscribe({
      next: (data) => {
        this.applications = data;
        this.filteredApplications = [...data];
      },
      error: (error) => console.error('Error loading applications:', error),
    });
  }

  applySearch(): void {
    this.filteredApplications = this.applications.filter(
      (app) =>
        app.student.fullName
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        app.job_title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        app.companyName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateStatus(application: any): void {
    this.applicationService
      .updateApplicationStatus(application.applicationId, application.status)
      .subscribe({
        next: () => {
          alert('Job Status Updated!');
        },
        error: (error) => console.error('Error updating status:', error),
      });
  }

  deleteApplication(applicationId: number): void {
    if (confirm('Are you sure you want to delete this application?')) {
      this.applicationService.deleteApplication(applicationId).subscribe({
        next: () => {
          this.applications = this.applications.filter(
            (app) => app.applicationId !== applicationId
          );
          this.filteredApplications = [...this.applications];
        },
        error: (error) => console.error('Error deleting application:', error),
      });
    }
  }

  exportToCSV(): void {
    const csvContent = this.convertToCSV(this.applications);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job-applications.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private convertToCSV(data: any[]): string {
    const headers = [
      'Application ID',
      'Student Name',
      'Register Number',
      'Stream',
      'Job Title',
      'Company',
      'Location',
      'CTC',
      'Status',
      'Applied Date',
    ];

    const rows = data.map((app) => [
      app.applicationId,
      `"${app.student.fullName}"`,
      app.student.registerNo,
      app.student.streams,
      `"${app.job_title}"`,
      `"${app.companyName}"`,
      `"${app.job_location}"`,
      `"${app.ctc}"`,
      app.status,
      new Date(app.appliedAt).toLocaleDateString(),
    ]);

    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  }
}
