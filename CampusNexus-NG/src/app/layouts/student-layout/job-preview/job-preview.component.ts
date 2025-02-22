import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/core/services/job/job.service';

@Component({
  selector: 'app-job-preview',
  templateUrl: './job-preview.component.html',
  styleUrls: ['./job-preview.component.css'],
})
export class JobPreviewComponent {
  job: any;
  studentData: any;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router
  ) {}

  applyJob(id: number) {
    this.jobService
      .applyForJob(this.studentData.register_id, id)
      .subscribe((data) => {
        if (data.success) {
          alert('You have successfully applied for this job');
          this.router.navigate(['/student/dashboard']);
        } else {
          alert(data.reasonForRejection);
          this.router.navigate(['/student/all-job-postings']);
        }
      });
  }

  goBack(): void {
    window.history.back();
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('student_Data');
    if (!storedData) {
      this.router.navigate(['/']);
    } else {
      this.studentData = JSON.parse(storedData);
    }

    const jobId = this.route.snapshot.paramMap.get('jobid');
    this.jobService.getJobInfo(jobId).subscribe((data) => {
      this.job = data;
    });
  }
}
