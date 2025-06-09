import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEjercicioComponent } from './update-ejercicio.component';

describe('UpdateEjercicioComponent', () => {
  let component: UpdateEjercicioComponent;
  let fixture: ComponentFixture<UpdateEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEjercicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
