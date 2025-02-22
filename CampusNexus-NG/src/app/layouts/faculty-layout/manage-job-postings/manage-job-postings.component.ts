import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { JobService } from 'src/app/core/services/job/job.service';

@Component({
  selector: 'app-manage-job-postings',
  templateUrl: './manage-job-postings.component.html',
  styleUrls: ['./manage-job-postings.component.css'],
})
export class ManageJobPostingsComponent {
  jobPostings: any[] = []; // Holds job data
  searchTerm: string = '';
  isChecked: boolean = false;
  activeIcon: SafeHtml;
  inactiveIcon: SafeHtml;
  filteredJobPostings: any[] = [];

  constructor(
    private jobService: JobService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    const activeIconSvg = `<svg width="20"  height="20" viewBox="0 0 1000 1000" fill="green" xmlns="http://www.w3.org/2000/svg"><path d="M 500 0C 224 0 0 224 0 500C 0 776 224 1000 500 1000C 776 1000 1000 776 1000 500C 1000 224 776 0 500 0C 500 0 500 0 500 0 M 250 475C 279 504 359 586 390 615C 400 625 410 615 410 615C 410 615 625 400 750 275C 765 260 785 260 800 275C 816 292 837 313 850 325C 865 340 865 360 850 375C 700 525 583 642 425 800C 410 815 390 815 375 800C 292 717 150 575 150 575C 135 560 135 540 150 525C 150 525 200 475 200 475C 215 461 235 460 250 475C 250 475 250 475 250 475"/></svg>`;
    const inactiveIconSvg = `<svg width="20" height="20" viewBox="0 0 1000 1000" fill="red" xmlns="http://www.w3.org/2000/svg"><path d="M 500 0C 224 0 0 224 0 500C 0 776 224 1000 500 1000C 776 1000 1000 776 1000 500C 1000 224 776 0 500 0C 500 0 500 0 500 0 M 253 677C 242 666 242 652 253 641C 253 641 394 500 394 500C 394 500 253 359 253 359C 242 348 242 334 253 323C 253 323 323 253 323 253C 334 242 348 242 359 253C 359 253 500 394 500 394C 500 394 641 253 641 253C 652 242 666 242 677 253C 677 253 747 323 747 323C 758 334 758 348 747 359C 747 359 606 500 606 500C 606 500 747 641 747 641C 758 652 758 666 747 677C 747 677 677 747 677 747C 666 758 652 758 641 747C 641 747 500 606 500 606C 500 606 359 747 359 747C 348 758 334 758 323 747C 323 747 253 677 253 677"/></svg>`;
    this.activeIcon = this.sanitizer.bypassSecurityTrustHtml(activeIconSvg);
    this.inactiveIcon = this.sanitizer.bypassSecurityTrustHtml(inactiveIconSvg);
  }

  applySearch() {
    if (!this.searchTerm) {
      this.filteredJobPostings = [...this.jobPostings];
      return;
    }

    const searchText = this.searchTerm.toLowerCase();
    this.filteredJobPostings = this.jobPostings.filter(
      (job) =>
        job.job_title.toLowerCase().includes(searchText) ||
        job.companyName.toLowerCase().includes(searchText) ||
        job.job_location.toLowerCase().includes(searchText)
    );
  }

  clearSearch() {
    this.searchTerm = '';
    this.filteredJobPostings = [...this.jobPostings];
  }

  onCheckboxChange() {
    if (this.isChecked) {
      this.jobService.getActiveJobs().subscribe((data) => {
        this.jobPostings = data;
        this.filteredJobPostings = [...data];
      });
    } else {
      this.jobService.getAllJobs().subscribe((data) => {
        this.jobPostings = data;
        this.filteredJobPostings = [...data];
      });
    }
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('user_Data');
    if (!storedData) {
      this.router.navigate(['/']);
    }

    this.jobService.getAllJobs().subscribe((data) => {
      this.jobPostings = data;
      this.filteredJobPostings = [...data]; // Initialize filtered array
    });
  }
}
