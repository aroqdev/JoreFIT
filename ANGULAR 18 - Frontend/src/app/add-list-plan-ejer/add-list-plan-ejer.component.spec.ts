import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListPlanEjerComponent } from './add-list-plan-ejer.component';

describe('AddListPlanEjerComponent', () => {
  let component: AddListPlanEjerComponent;
  let fixture: ComponentFixture<AddListPlanEjerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddListPlanEjerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddListPlanEjerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
