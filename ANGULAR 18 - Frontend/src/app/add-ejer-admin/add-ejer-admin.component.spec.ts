import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEjerAdminComponent } from './add-ejer-admin.component';

describe('AddEjerAdminComponent', () => {
  let component: AddEjerAdminComponent;
  let fixture: ComponentFixture<AddEjerAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEjerAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEjerAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
