import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdAdminComponent } from './upd-admin.component';

describe('UpdAdminComponent', () => {
  let component: UpdAdminComponent;
  let fixture: ComponentFixture<UpdAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
