import { Component } from '@angular/core';
import { Footer2Component } from "../footer2/footer2.component";
import { Planes } from '../interface/planes.interface';
import { PlanesService } from '../services/planes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-plans',
  standalone: true,
  imports: [Footer2Component, CommonModule, FormsModule, RouterLink],
  templateUrl: './list-plans.component.html',
  styleUrl: './list-plans.component.css'
})
export class ListPlansComponent {
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
