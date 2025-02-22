import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';

@Component({
  selector: 'app-manage-coordinators',
  templateUrl: './manage-coordinators.component.html',
  styleUrls: ['./manage-coordinators.component.css'],
})
export class ManageCoordinatorsComponent {
  coordinators: any[] = [];
  searchTerm: string = '';
  filteredCoordinators: any[] = [];

  constructor(private userService: FacultyService, private router: Router) {}

  ngOnInit(): void {
    this.loadCoordinators();
  }

  private loadCoordinators(): void {
    this.userService.getAllCoordinators().subscribe({
      next: (data) => {
        this.coordinators = data;
        this.filteredCoordinators = [...data];
      },
      error: (error) => console.error('Error loading coordinators:', error),
    });
  }

  applySearch(): void {
    if (!this.searchTerm) {
      this.filteredCoordinators = [...this.coordinators];
      return;
    }

    const searchText = this.searchTerm.toLowerCase();
    this.filteredCoordinators = this.coordinators.filter(
      (coordinator) =>
        coordinator.name.toLowerCase().includes(searchText) ||
        coordinator.email.toLowerCase().includes(searchText) ||
        coordinator.id.toString().includes(searchText)
    );
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredCoordinators = [...this.coordinators];
  }

  verifyCoordinator(coordinatorId: number): void {
    if (confirm('Are you sure you want to verify this coordinator?')) {
      this.userService.varifyCoordinator(coordinatorId).subscribe({
        next: () => {
          const index = this.coordinators.findIndex(
            (c) => c.id === coordinatorId
          );
          if (index > -1) {
            this.coordinators[index].varified = true;
            this.filteredCoordinators = [...this.coordinators];
          }
        },
        error: (error) => console.error('Error verifying coordinator:', error),
      });
    }
  }

  deleteCoordinator(coordinatorId: number): void {
    if (confirm('Are you sure you want to delete this coordinator?')) {
      this.userService.deleteCoordinator(coordinatorId).subscribe();
    }
    this.coordinators = this.coordinators.filter((c) => c.id !== coordinatorId);
    this.filteredCoordinators = [...this.coordinators];
  }
}
