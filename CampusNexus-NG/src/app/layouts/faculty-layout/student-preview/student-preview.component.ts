import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-student-preview',
  templateUrl: './student-preview.component.html',
  styleUrls: ['./student-preview.component.css'],
})
export class StudentPreviewComponent {
  studentData: any;
  StudentResume: string | SafeResourceUrl | null = null;
  studentId: any;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  downloadResume(): void {
    if (!this.studentData.resume) return;

    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${this.studentData.resume}`;
    link.download = `${this.studentData.fullName.replace(' ', '_')}_Resume.pdf`;
    link.click();
  }

  ngOnInit(): void {
    this.studentId = this.route.snapshot.paramMap.get('studentid');
    if (this.studentId) {
      this.studentService.getProfile(this.studentId).subscribe({
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

  goBack(): void {
    window.history.back();
  }
}
