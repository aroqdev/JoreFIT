import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlansEjerComponent } from './list-plans-ejer.component';

describe('ListPlansEjerComponent', () => {
  let component: ListPlansEjerComponent;
  let fixture: ComponentFixture<ListPlansEjerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPlansEjerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPlansEjerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
