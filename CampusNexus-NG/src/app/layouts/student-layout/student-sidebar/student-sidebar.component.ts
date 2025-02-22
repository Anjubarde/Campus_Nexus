import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.css'],
})
export class StudentSidebarComponent {
  constructor(private router: Router) {}

  studentImage: string | null = null;
  studentAltImage: string = '';
  studentData: any = {};

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  loadLocalStorageData() {
    const storedData = localStorage.getItem('student_Data');

    if (storedData) {
      this.studentData = JSON.parse(storedData);
      this.studentAltImage = this.studentData.fullName.charAt(0).toUpperCase();
    }

    if (this.studentData.image != null) {
      this.studentImage = `data:image/jpeg;base64,${this.studentData.image}`;
    }
  }
  ngOnInit(): void {
    this.loadLocalStorageData();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.loadLocalStorageData(); // Re-load data when navigation occurs
      }
    });
  }
}
