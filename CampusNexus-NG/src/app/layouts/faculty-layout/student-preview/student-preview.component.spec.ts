import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentPreviewComponent } from './student-preview.component';

describe('StudentPreviewComponent', () => {
  let component: StudentPreviewComponent;
  let fixture: ComponentFixture<StudentPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentPreviewComponent]
    });
    fixture = TestBed.createComponent(StudentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
