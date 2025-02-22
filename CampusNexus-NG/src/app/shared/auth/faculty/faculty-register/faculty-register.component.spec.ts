import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyRegisterComponent } from './faculty-register.component';

describe('FacultyRegisterComponent', () => {
  let component: FacultyRegisterComponent;
  let fixture: ComponentFixture<FacultyRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacultyRegisterComponent]
    });
    fixture = TestBed.createComponent(FacultyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
