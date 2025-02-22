import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { StudentService } from 'src/app/core/services/student/student.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css'],
})
export class UpdateStudentComponent implements OnInit {
  userForm: FormGroup;
  studImage: File | null = null;
  studResume: File | null = null;
  streamsList: string[] = [
    'COMPUTER_SCIENCE',
    'INFORMATION_TECHNOLOGY',
    'MECHANICAL',
    'ELECTRICAL',
    'CIVIL',
    'ELECTRONICS',
  ];
  uploadedImage = false;
  uploadedResume = false;
  @ViewChild('profileImage') profileImage: ElementRef | undefined;
  @ViewChild('studentResume') studentResume: ElementRef | undefined;
  studentId: number = 0;
  imagePreview: string | ArrayBuffer | null = null;
  existingImage: string | null = null;
  existingResume: string | SafeResourceUrl | null = null;
  resumePreview: string | ArrayBuffer | null = null;
  isImgChanged = false;
  isResumeChanged = false;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.userForm = this.fb.group({
      registerNo: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      birthDate: ['', Validators.required],
      streams: ['', Validators.required],
      resume: [null, Validators.required],
      image: [null, Validators.required],
      profileSummary: ['', Validators.required],
      skills: ['', Validators.required],
    });
  }

  ngOnInit() {
    const storedData = localStorage.getItem('student_Data');
    if (!storedData) {
      this.router.navigate(['/']);
    }
    if (storedData) {
      this.studentId = JSON.parse(storedData).id;
    }
    this.getStudentData();
  }

  getStudentData() {
    this.studentService.getProfile(this.studentId).subscribe({
      next: (response) => {
        // Convert ISO date to YYYY-MM-DD format
        const isoDate = response.birthDate;
        const formattedDate = new Date(isoDate).toISOString().split('T')[0];

        // Patch the form with the retrieved values
        this.userForm.patchValue({
          ...response,
          birthDate: formattedDate,
        });

        // Set the existing image if available; otherwise, keep it null.
        if (response.image) {
          this.existingImage = `data:image/jpeg;base64,${response.image}`;
        } else {
          this.existingImage = null;
        }

        // Set the existing resume preview if available; otherwise, null.
        if (response.resume) {
          const base64Pdf = response.resume;
          this.existingResume = this.sanitizer.bypassSecurityTrustResourceUrl(
            `data:application/pdf;base64,${base64Pdf}`
          );
        } else {
          this.existingResume = null;
        }
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Student Not Found');
      },
    });
  }

  // File selection handler for both image and resume
  onFileSelect(event: Event, fileType: string) {
    const fileInput = event.target as HTMLInputElement;

    if (fileInput?.files?.length) {
      const file = fileInput.files[0];

      // Validate file type
      if (fileType === 'image' && !file.type.startsWith('image/')) {
        alert('Only image files are allowed.');
        fileInput.value = '';
        return;
      }
      if (fileType === 'resume' && file.type !== 'application/pdf') {
        alert('Only PDF files are allowed.');
        fileInput.value = '';
        return;
      }

      // Update the form control with the file
      this.userForm.patchValue({ [fileType]: file });
      this.userForm.get(fileType)?.updateValueAndValidity();

      if (fileType === 'image') {
        this.isImgChanged = true;
        this.studImage = file;
        // Clear any previously loaded API image
        this.existingImage = null;
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      } else if (fileType === 'resume') {
        this.isResumeChanged = true;
        this.studResume = file;
        // Use FileReader to read the PDF as Data URL for preview
        const reader = new FileReader();
        reader.onload = () => {
          // Pass the result through the sanitizer to create a safe URL
          this.existingResume = this.sanitizer.bypassSecurityTrustResourceUrl(
            reader.result as string
          );
        };
        reader.readAsDataURL(file);
      }
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.loading = true;
      const formData = new FormData();
      formData.append('registerNo', this.userForm.value.registerNo);
      formData.append('fullName', this.userForm.value.fullName);
      formData.append('email', this.userForm.value.email);
      formData.append('mobile', this.userForm.value.mobile);
      formData.append('streams', this.userForm.value.streams);
      formData.append('birthDate', this.userForm.value.birthDate);
      formData.append('profileSummary', this.userForm.value.profileSummary);
      formData.append('skills', this.userForm.value.skills);
      // Append image/resume only if a new file is selected.
      if (this.studImage) {
        formData.append('image', this.studImage as Blob);
      }
      if (this.studResume) {
        formData.append('resume', this.studResume as Blob);
      }

      this.studentService.updateProfile(formData, this.studentId).subscribe({
        next: (response) => {
          this.loading = false;
          this.updateLocalStorageUser();
          alert('Profile updated successfully!');
          this.router.navigate(['/student/dashboard']);
        },
        error: (err) => {
          this.loading = false;
          console.error('Error:', err);
          alert('Update failed. Please try again.');
        },
      });
    } else {
      this.userForm.markAllAsTouched();
    }
  }

  updateLocalStorageUser() {
    const studentData = localStorage.getItem('student_Data');
    let res_id = 0;
    if (studentData) {
      res_id = Number(JSON.parse(studentData).register_id);
    }
    this.studentService.getStudentByRegisterNo(res_id).subscribe({
      next: (response) => {
        if (response && response.imageBlob) {
          this.convertBlobToBase64(response.image).then(
            (base64Image: string) => {
              localStorage.setItem('student_Image', base64Image);
            }
          );
        }
        localStorage.setItem('student_Data', JSON.stringify(response));
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
