import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';

@Component({
  selector: 'app-faculty-profile',
  templateUrl: './faculty-profile.component.html',
  styleUrls: ['./faculty-profile.component.css'],
})
export class FacultyProfileComponent {
  profileForm: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';
  userData: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: FacultyService
  ) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.loadLocalStorageData();
  }

  loadLocalStorageData() {
    const storedData = localStorage.getItem('user_Data');

    if (storedData) {
      this.userData = JSON.parse(storedData);
    } else {
      this.router.navigate(['/']);
    }
    this.profileForm.patchValue({
      name: this.userData.name,
      email: this.userData.email,
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    this.isSubmitting = true;
    this.successMessage = '';
    this.errorMessage = '';

    const updateData = {
      name: this.profileForm.value.name,
      email: this.profileForm.value.email,
    };

    this.userService
      .updateUser(updateData, this.userData.id)
      .pipe(
        catchError((error) => {
          this.isSubmitting = false;
          this.errorMessage = 'Failed to update profile. Please try again.';
          return throwError(error);
        })
      )
      .subscribe({
        next: (response) => {
          localStorage.setItem('user_Data', JSON.stringify(response));
          this.isSubmitting = false;
          this.successMessage = 'Profile updated successfully!';
          setTimeout(() => (this.successMessage = ''), 1000);
          setTimeout(() => this.router.navigate(['faculty/dashboard']), 1000);
        },
        error: () => {
          this.isSubmitting = false;
        },
      });

    // Replace with actual API endpoint
    // this.http
    //   .put<any>('/api/users/current', updateData)
    //   .pipe(
    //     catchError((error) => {
    //       this.isSubmitting = false;
    //       this.errorMessage = 'Failed to update profile. Please try again.';
    //       return throwError(error);
    //     })
    //   )
    //   .subscribe({
    //     next: () => {
    //       this.isSubmitting = false;
    //       this.successMessage = 'Profile updated successfully!';
    //       setTimeout(() => (this.successMessage = ''), 3000);
    //     },
    //     error: () => {
    //       this.isSubmitting = false;
    //     },
    //   });
  }
}
