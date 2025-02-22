import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css'],
})
export class StudentLoginComponent {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Initialize the form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email validation
      password: ['', [Validators.required, Validators.minLength(6)]], // Password validation
    });
  }

  // Getters for form controls
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // Handle form submission
  onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.authService.studentLogin(formData).subscribe({
        next: (response) => {
          this.loginError = false;
          // Store the rest of the student data in local storage
          localStorage.setItem('student_Data', JSON.stringify(response));
          this.router.navigate(['/student/dashboard']);
        },
        error: (error) => {
          console.error('Student Login Failed', error);
          this.loginError = true;
          this.loginForm.reset();
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }

  ngOnInit(): void {
    
  }
}
