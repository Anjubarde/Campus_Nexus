import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';

@Component({
  selector: 'app-faculty-dashboard',
  templateUrl: './faculty-dashboard.component.html',
  styleUrls: ['./faculty-dashboard.component.css'],
})
export class FacultyDashboardComponent {
  userData:any = {};
  userRole: string = 'admin';
  userName: string = 'Admin User';
  isAdmin: boolean = true;

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
    const storedData = localStorage.getItem('user_Data');
    this.userData = storedData ? JSON.parse(storedData) : null;
    this.userRole = this.userData?.role || 'admin';
    this.userName = this.userData?.name || 'Admin User';
    this.isAdmin = this.userRole === 'admin';
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
