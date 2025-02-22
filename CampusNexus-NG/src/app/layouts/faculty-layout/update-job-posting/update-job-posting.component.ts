import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { JobService } from 'src/app/core/services/job/job.service';

@Component({
  selector: 'app-update-job-posting',
  templateUrl: './update-job-posting.component.html',
  styleUrls: ['./update-job-posting.component.css'],
})
export class UpdateJobPostingComponent {
  jobForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  jobId!: number;
  userData: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private jobService: JobService
  ) {
    this.jobForm = this.fb.group({
      job_title: ['', Validators.required],
      job_description: ['', Validators.required],
      companyName: [''],
      startDate: [''],
      endDate: [''],
      job_location: [''],
      eligibilityCriteria: [''],
      company_url: [''],
      ctc: [''],
      active: [true],
    });
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('user_Data');

    if (storedData) {
      this.userData = JSON.parse(storedData);
    }
    this.jobId = this.route.snapshot.params['jobid'];
    this.fetchJobDetails();
  }

  fetchJobDetails(): void {
    this.jobService.getJobInfo(this.jobId).subscribe({
      next: (job) => {
        this.jobForm.patchValue({
          ...job,
          startDate: this.formatDateForInput(job.startDate),
          endDate: this.formatDateForInput(job.endDate),
        });
      },
      error: (error) => {
        this.errorMessage = 'Failed to load job details';
      },
    });
  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  }

  onSubmit(): void {
    if (this.jobForm.invalid) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formData = this.jobForm.value;

    this.jobService
      .updateJob(this.userData.id, this.jobId, formData)
      .pipe(
        catchError((error) => {
          this.isSubmitting = false;
          this.errorMessage =
            error.error?.message || 'Failed to update job posting';
          return throwError(error);
        })
      )
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.successMessage = 'Job posting updated successfully!';
          setTimeout(() => (this.successMessage = ''), 1000);
          setTimeout(() => window.history.back(), 1000);
        },
        error: () => (this.isSubmitting = false),
      });
  }

  goBack(): void {
    window.history.back();
  }
}
