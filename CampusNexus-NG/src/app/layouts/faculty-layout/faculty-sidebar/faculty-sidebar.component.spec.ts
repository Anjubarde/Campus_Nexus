import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultySidebarComponent } from './faculty-sidebar.component';

describe('FacultySidebarComponent', () => {
  let component: FacultySidebarComponent;
  let fixture: ComponentFixture<FacultySidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FacultySidebarComponent]
    });
    fixture = TestBed.createComponent(FacultySidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
