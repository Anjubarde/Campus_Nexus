import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from 'src/app/core/services/job/job.service';

@Component({
  selector: 'app-faculty-job-preview',
  templateUrl: './faculty-job-preview.component.html',
  styleUrls: ['./faculty-job-preview.component.css'],
})
export class FacultyJobPreviewComponent {
  job: any;
  userData: any;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private router: Router
  ) {}

  editPosting(id: number) {}

  goBack(): void {
    window.history.back();
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('user_Data');
    if (!storedData) {
      this.router.navigate(['/']);
    } else {
      this.userData = JSON.parse(storedData);
    }

    const jobId = this.route.snapshot.paramMap.get('jobid');
    this.jobService.getJobInfo(jobId).subscribe((data) => {
      this.job = data;
    });
  }
}
