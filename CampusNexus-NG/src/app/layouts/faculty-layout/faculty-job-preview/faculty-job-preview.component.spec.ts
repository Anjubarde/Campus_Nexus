import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyJobPreviewComponent } from './faculty-job-preview.component';

describe('FacultyJobPreviewComponent', () => {
  let component: FacultyJobPreviewComponent;
  let fixture: ComponentFixture<FacultyJobPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacultyJobPreviewComponent]
    });
    fixture = TestBed.createComponent(FacultyJobPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
