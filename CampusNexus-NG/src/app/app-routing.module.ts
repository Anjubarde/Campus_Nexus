import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLoginComponent } from './shared/auth/main-login/main-login.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { StudentDashboardComponent } from './layouts/student-layout/student-dashboard/student-dashboard.component';
import { FacultyDashboardComponent } from './layouts/faculty-layout/faculty-dashboard/faculty-dashboard.component';
import { UpdateStudentComponent } from './layouts/student-layout/update-student/update-student.component';
import { StudentProfileComponent } from './layouts/student-layout/student-profile/student-profile.component';
import { AllJobPostingComponent } from './layouts/student-layout/all-job-posting/all-job-posting.component';
import { AppliedJobsComponent } from './layouts/student-layout/applied-jobs/applied-jobs.component';
import { JobPreviewComponent } from './layouts/student-layout/job-preview/job-preview.component';
import { FacultyProfileComponent } from './layouts/faculty-layout/faculty-profile/faculty-profile.component';
import { ManageStudentsComponent } from './layouts/faculty-layout/manage-students/manage-students.component';
import { ManageCoordinatorsComponent } from './layouts/faculty-layout/manage-coordinators/manage-coordinators.component';
import { ManageJobApplicationsComponent } from './layouts/faculty-layout/manage-job-applications/manage-job-applications.component';
import { ManageJobPostingsComponent } from './layouts/faculty-layout/manage-job-postings/manage-job-postings.component';
import { AddJobPostingComponent } from './layouts/faculty-layout/add-job-posting/add-job-posting.component';
import { StudentPreviewComponent } from './layouts/faculty-layout/student-preview/student-preview.component';
import { FacultyJobPreviewComponent } from './layouts/faculty-layout/faculty-job-preview/faculty-job-preview.component';
import { UpdateJobPostingComponent } from './layouts/faculty-layout/update-job-posting/update-job-posting.component';

const routes: Routes = [
  { path: '', component: MainLoginComponent },
  { path: 'student/dashboard', component: StudentDashboardComponent },
  { path: 'student/edit-profile', component: UpdateStudentComponent },
  { path: 'student/view-profile', component: StudentProfileComponent },
  { path: 'student/all-job-postings', component: AllJobPostingComponent },
  { path: 'student/applied-jobs', component: AppliedJobsComponent },
  { path: 'student/job-preview/:jobid', component: JobPreviewComponent },

  { path: 'faculty/dashboard', component: FacultyDashboardComponent },
  { path: 'faculty/edit-profile', component: FacultyProfileComponent },
  { path: 'faculty/manage-job-postings', component: ManageJobPostingsComponent },
  { path: 'faculty/manage-job-applications', component: ManageJobApplicationsComponent },
  { path: 'admin/manage-users', component: ManageCoordinatorsComponent },
  { path: 'faculty/manage-students', component: ManageStudentsComponent },
  { path: 'faculty/add-job-posting', component: AddJobPostingComponent },
  { path: 'faculty/add-job-posting', component: AddJobPostingComponent },
  { path: 'faculty/student-preview/:studentid', component: StudentPreviewComponent },
  { path: 'faculty/job-preview/:jobid', component: FacultyJobPreviewComponent },
  { path: 'faculty/update-posting/:jobid', component: UpdateJobPostingComponent },


  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
