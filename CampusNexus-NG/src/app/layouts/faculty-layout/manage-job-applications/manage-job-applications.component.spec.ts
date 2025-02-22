import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJobApplicationsComponent } from './manage-job-applications.component';

describe('ManageJobApplicationsComponent', () => {
  let component: ManageJobApplicationsComponent;
  let fixture: ComponentFixture<ManageJobApplicationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageJobApplicationsComponent]
    });
    fixture = TestBed.createComponent(ManageJobApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
