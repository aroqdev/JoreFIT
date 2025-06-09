import { Component } from '@angular/core';
import { Footer2Component } from "../footer2/footer2.component";
import { RouterLink } from '@angular/router';
import { Planes } from '../interface/planes.interface';
import { PlanesService } from '../services/planes.service';

@Component({
  selector: 'app-add-plan',
  standalone: true,
  imports: [Footer2Component, RouterLink],
  templateUrl: './add-plan.component.html',
  styleUrl: './add-plan.component.css'
})
export class AddPlanComponent {
  planes: Planes[] = [];

  constructor(private planesService: PlanesService) { }

  ngOnInit() {
    this.planesService.mostrarPlan().subscribe({
      next: (data) => {
        console.log(data);
        this.planes = data.planes;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}