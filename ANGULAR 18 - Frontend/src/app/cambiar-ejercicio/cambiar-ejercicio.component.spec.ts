import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarEjercicioComponent } from './cambiar-ejercicio.component';

describe('CambiarEjercicioComponent', () => {
  let component: CambiarEjercicioComponent;
  let fixture: ComponentFixture<CambiarEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CambiarEjercicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
