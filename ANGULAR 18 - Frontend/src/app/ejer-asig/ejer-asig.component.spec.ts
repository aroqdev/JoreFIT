import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjerAsigComponent } from './ejer-asig.component';

describe('EjerAsigComponent', () => {
  let component: EjerAsigComponent;
  let fixture: ComponentFixture<EjerAsigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjerAsigComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjerAsigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
