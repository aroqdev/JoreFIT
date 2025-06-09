import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAsigAdminComponent } from './plan-asig-admin.component';

describe('PlanAsigAdminComponent', () => {
  let component: PlanAsigAdminComponent;
  let fixture: ComponentFixture<PlanAsigAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanAsigAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanAsigAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
