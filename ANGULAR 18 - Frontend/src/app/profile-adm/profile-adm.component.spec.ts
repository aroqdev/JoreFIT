import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAdmComponent } from './profile-adm.component';

describe('ProfileAdmComponent', () => {
  let component: ProfileAdmComponent;
  let fixture: ComponentFixture<ProfileAdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileAdmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileAdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
