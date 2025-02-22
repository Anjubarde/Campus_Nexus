import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJobPostingComponent } from './update-job-posting.component';

describe('UpdateJobPostingComponent', () => {
  let component: UpdateJobPostingComponent;
  let fixture: ComponentFixture<UpdateJobPostingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateJobPostingComponent]
    });
    fixture = TestBed.createComponent(UpdateJobPostingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
