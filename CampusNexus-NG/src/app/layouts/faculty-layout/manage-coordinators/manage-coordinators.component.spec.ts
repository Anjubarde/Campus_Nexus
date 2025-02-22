import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCoordinatorsComponent } from './manage-coordinators.component';

describe('ManageCoordinatorsComponent', () => {
  let component: ManageCoordinatorsComponent;
  let fixture: ComponentFixture<ManageCoordinatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageCoordinatorsComponent]
    });
    fixture = TestBed.createComponent(ManageCoordinatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
