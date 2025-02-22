import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-faculty-sidebar',
  templateUrl: './faculty-sidebar.component.html',
  styleUrls: ['./faculty-sidebar.component.css'],
})
export class FacultySidebarComponent {
  constructor(private router: Router) {}
  imagePreview: string = '';
  userData: any = {};

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  loadLocalStorageData() {
    const storedData = localStorage.getItem('user_Data');

    if (storedData) {
      this.userData = JSON.parse(storedData);
      this.imagePreview = this.userData.name.charAt(0).toUpperCase();
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
