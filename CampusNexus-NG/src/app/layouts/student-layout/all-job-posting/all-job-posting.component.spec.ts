import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllJobPostingComponent } from './all-job-posting.component';

describe('AllJobPostingComponent', () => {
  let component: AllJobPostingComponent;
  let fixture: ComponentFixture<AllJobPostingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllJobPostingComponent]
    });
    fixture = TestBed.createComponent(AllJobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
