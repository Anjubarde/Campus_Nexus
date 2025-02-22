import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-student-register',
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css'],
})
export class StudentRegisterComponent {
  studentForm: FormGroup;
  streams_data: string[] = [
    'COMPUTER_SCIENCE',
    'INFORMATION_TECHNOLOGY',
    'MECHANICAL',
    'ELECTRICAL',
    'CIVIL',
    'ELECTRONICS',
  ];
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private studentService: StudentService
  ) {
    this.studentForm = this.fb.group({
      register_id: [
        '',
        [Validators.required, Validators.pattern(/^\d{8}$/)], // 8-digit register ID
      ],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: [
        '',
        [Validators.required, Validators.pattern(/^\d{10}$/)], // 10-digit mobile number
      ],
      streams: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
          ), // Password pattern
        ],
      ],
    });
  }

  get register_id() {
    return this.studentForm.get('register_id');
  }

  get fullName() {
    return this.studentForm.get('fullName');
  }

  get email() {
    return this.studentForm.get('email');
  }

  get password() {
    return this.studentForm.get('password');
  }

  get streams() {
    return this.studentForm.get('streams');
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.studentService.registerStudent(this.studentForm.value).subscribe({
        next: (response) => {
          window.location.reload();
          alert('Your account has been created successfully.');
        },
        error: (error) => {
          console.log(error);
          if (error.status === 409 && error.error.field) {
            const fieldName = error.error.field;
            const fieldControl = this.studentForm.get(fieldName);
            if (fieldControl) {
              fieldControl.setErrors({ duplicate: error.error.message });
            }
          }
        },
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
