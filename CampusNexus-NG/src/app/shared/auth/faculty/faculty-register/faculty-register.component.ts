import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from 'src/app/core/services/faculty/faculty.service';

@Component({
  selector: 'app-faculty-register',
  templateUrl: './faculty-register.component.html',
  styleUrls: ['./faculty-register.component.css'],
})
export class FacultyRegisterComponent {
  facultyForm: FormGroup;
  registerSuccessful: boolean = false;

  constructor(private fb: FormBuilder, private facultyService: FacultyService) {
    this.facultyForm = this.fb.group({
      name: ['', [Validators.required]], // Name is required
      email: ['', [Validators.required, Validators.email]], // Email is required and must be valid
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ),
        ],
      ], // Password: 6 characters, one number, one letter, one special character
    });
  }

  // Getter methods for easier access in the template
  get name() {
    return this.facultyForm.get('name');
  }

  get email() {
    return this.facultyForm.get('email');
  }

  get password() {
    return this.facultyForm.get('password');
  }

  // Method called on form submission
  onSubmit() {
    if (this.facultyForm.valid) {
      // console.log('Form submitted:', this.facultyForm.value);
      this.facultyService
        .registerCoordinator(this.facultyForm.value)
        .subscribe((response) => {
          console.log(response);
        });
      this.registerSuccessful = true;
      this.facultyForm.reset(); // Reset form after successful submission
    } else {
      this.registerSuccessful = false;
      console.log('Form is invalid');
    }
  }
}
