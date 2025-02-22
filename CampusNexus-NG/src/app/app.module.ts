import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './shared/auth/footer/footer.component';
import { StudentLoginComponent } from './shared/auth/student/student-login/student-login.component';
import { StudentRegisterComponent } from './shared/auth/student/student-register/student-register.component';
import { FacultyRegisterComponent } from './shared/auth/faculty/faculty-register/faculty-register.component';
import { MainLoginComponent } from './shared/auth/main-login/main-login.component';
import { FacultyLoginComponent } from './shared/auth/faculty/faculty-login/faculty-login.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { StudentDashboardComponent } from './layouts/student-layout/student-dashboard/student-dashboard.component';
import { UpdateStudentComponent } from './layouts/student-layout/update-student/update-student.component';
import { FacultyDashboardComponent } from './layouts/faculty-layout/faculty-dashboard/faculty-dashboard.component';
import { FacultyProfileComponent } from './layouts/faculty-layout/faculty-profile/faculty-profile.component';
import { ManageStudentsComponent } from './layouts/faculty-layout/manage-students/manage-students.component';
import { ManageCoordinatorsComponent } from './layouts/faculty-layout/manage-coordinators/manage-coordinators.component';
import { ManageJobPostingsComponent } from './layouts/faculty-layout/manage-job-postings/manage-job-postings.component';
import { ManageJobApplicationsComponent } from './layouts/faculty-layout/manage-job-applications/manage-job-applications.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { StudentSidebarComponent } from './layouts/student-layout/student-sidebar/student-sidebar.component';
import { FacultySidebarComponent } from './layouts/faculty-layout/faculty-sidebar/faculty-sidebar.component';
import { StudentProfileComponent } from './layouts/student-layout/student-profile/student-profile.component';
import { AllJobPostingComponent } from './layouts/student-layout/all-job-posting/all-job-posting.component';
import { AppliedJobsComponent } from './layouts/student-layout/applied-jobs/applied-jobs.component';
import { JobPreviewComponent } from './layouts/student-layout/job-preview/job-preview.component';
import { StudentPreviewComponent } from './layouts/faculty-layout/student-preview/student-preview.component';
import { AddJobPostingComponent } from './layouts/faculty-layout/add-job-posting/add-job-posting.component';
import { FacultyJobPreviewComponent } from './layouts/faculty-layout/faculty-job-preview/faculty-job-preview.component';
import { UpdateJobPostingComponent } from './layouts/faculty-layout/update-job-posting/update-job-posting.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    StudentLoginComponent,
    StudentRegisterComponent,
    FacultyLoginComponent,
    FacultyRegisterComponent,
    FacultyLoginComponent,
    MainLoginComponent,
    StudentDashboardComponent,
    UpdateStudentComponent,
    FacultyDashboardComponent,
    FacultyProfileComponent,
    ManageStudentsComponent,
    ManageCoordinatorsComponent,
    ManageJobPostingsComponent,
    ManageJobApplicationsComponent,
    PageNotFoundComponent,
    StudentSidebarComponent,
    FacultySidebarComponent,
    StudentProfileComponent,
    AllJobPostingComponent,
    AppliedJobsComponent,
    JobPreviewComponent,
    StudentPreviewComponent,
    AddJobPostingComponent,
    FacultyJobPreviewComponent,
    UpdateJobPostingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
