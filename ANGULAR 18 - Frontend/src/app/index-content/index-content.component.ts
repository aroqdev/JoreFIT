import { Component } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { RouterLink } from '@angular/router';
import { Planes } from '../interface/planes.interface';
import { PlanesService } from '../services/planes.service';

@Component({
  selector: 'app-index-content',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './index-content.component.html',
  styleUrl: './index-content.component.css'
})
export class IndexContentComponent {
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
