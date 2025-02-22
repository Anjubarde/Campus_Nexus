import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { JobService } from 'src/app/core/services/job/job.service';

@Component({
  selector: 'app-add-job-posting',
  templateUrl: './add-job-posting.component.html',
  styleUrls: ['./add-job-posting.component.css'],
})
export class AddJobPostingComponent {
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
  }

  onSubmit(): void {
    if (this.jobForm.invalid) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formData = this.jobForm.value;

    this.jobService
      .createJobPosting(formData, this.userData.id)
      .pipe(
        catchError((error) => {
          this.isSubmitting = false;
          this.errorMessage =
            error.error?.message || 'Failed to add job posting';
          return throwError(error);
        })
      )
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.successMessage = 'Job posted successfully!';
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
