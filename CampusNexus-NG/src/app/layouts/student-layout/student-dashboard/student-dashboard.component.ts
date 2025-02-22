import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';
import { StudentService } from 'src/app/core/services/student/student.service';

interface DashboardStats {
  appliedJobs: number;
  upcomingInterviews: number;
  profileComplete: number;
  notifications: number;
}

interface Deadline {
  title: string;
  company: string;
  date: Date;
  type: string;
}

interface JobPosting {
  title: string;
  company: string;
  location: string;
  deadline: Date;
}

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css'],
})
export class StudentDashboardComponent {
  studentData: any = {};
  stats = {
    totalStudents: 0,
    activeJobs: 0,
    totalApplications: 0,
    totalJobs: 0,
  };

  constructor(private facultyService: FacultyService, private router: Router) {}

  ngOnInit(): void {
    this.checkUserRole();
    this.loadDashboardData();
  }

  private checkUserRole(): void {
    const storedData = localStorage.getItem('student_Data');
    this.studentData = storedData ? JSON.parse(storedData) : null;
  }

  private loadDashboardData(): void {
    this.facultyService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
      },
      error: (error) => console.error('Error loading stats:', error),
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  navigateTo(route: string): void {
    this.router.navigate([`/dashboard/${route}`]);
  }
}
