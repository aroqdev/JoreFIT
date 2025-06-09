import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdUsrComponent } from './upd-usr.component';

describe('UpdUsrComponent', () => {
  let component: UpdUsrComponent;
  let fixture: ComponentFixture<UpdUsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdUsrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
