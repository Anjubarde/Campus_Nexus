import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/core/services/student/student.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css'],
  providers: [DatePipe],
})
export class StudentProfileComponent {
  studentData: any;
  StudentResume: string | SafeResourceUrl | null = null;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  downloadResume(): void {
    if (!this.studentData.resume) return;

    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${this.studentData.resume}`;
    link.download = `${this.studentData.fullName.replace(' ', '_')}_Resume.pdf`;
    link.click();
  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('student_Data');
    if (!storedData) {
      this.router.navigate(['/']);
    }
    if (storedData) {
      // this.studentData = JSON.parse(storedData);
      this.studentService.getProfile(JSON.parse(storedData).id).subscribe({
        next: (response) => {
          this.studentData = response;
          if (response.resume != null) {
            const base64Pdf = response.resume;
            this.StudentResume = this.sanitizer.bypassSecurityTrustResourceUrl(
              `data:application/pdf;base64,${base64Pdf}`
            );
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
