import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlamAdminComponent } from './plam-admin.component';

describe('PlamAdminComponent', () => {
  let component: PlamAdminComponent;
  let fixture: ComponentFixture<PlamAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlamAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlamAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
