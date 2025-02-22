import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-manage-students',
  templateUrl: './manage-students.component.html',
  styleUrls: ['./manage-students.component.css'],
})
export class ManageStudentsComponent {
  students: any[] = [];
  searchTerm: string = '';
  showCSOnly: boolean = false;
  filteredStudents: any[] = [];

  constructor(
    private studentService: StudentService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadStudents();
  }

  private checkAuthentication(): void {
    const storedData = localStorage.getItem('user_Data');
    if (!storedData) {
      this.router.navigate(['/']);
    }
  }

  private loadStudents(): void {
    this.studentService.getAllStudent().subscribe({
      next: (data) => {
        this.students = data;
        this.filteredStudents = [...data];
      },
      error: (error) => console.error('Error loading students:', error),
    });
  }

  applySearch(): void {
    if (!this.searchTerm) {
      this.filteredStudents = [...this.students];
      return;
    }

    const searchText = this.searchTerm.toLowerCase();
    this.filteredStudents = this.students.filter(
      (student) =>
        student.fullName.toLowerCase().includes(searchText) ||
        student.email.toLowerCase().includes(searchText) ||
        student.register_id.toString().includes(searchText)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredStudents = [...this.students];
  }

  deleteStudent(studentId: number): void {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(studentId).subscribe({
        next: () => {
          this.students = this.students.filter((s) => s.id !== studentId);
          this.filteredStudents = [...this.students];
          alert('Student Deleted!');
        },
        error: (error) => console.error('Error deleting student:', error),
      });
    }
  }

  exportToCSV(): void {
    // Implement CSV export logic here
    const csvContent = this.convertToCSV(this.filteredStudents);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  private convertToCSV(students: any[]): string {
    const headers = ['Register ID', 'Full Name', 'Email', 'Mobile', 'Stream'];
    const rows = students.map((student) => [
      student.register_id,
      student.fullName,
      student.email,
      student.mobile,
      student.streams,
    ]);
    return [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
  }
}
