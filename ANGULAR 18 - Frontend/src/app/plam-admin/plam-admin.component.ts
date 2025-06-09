import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Planes } from '../interface/planes.interface';
import { PlanesService } from '../services/planes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Footer2Component } from '../footer2/footer2.component';

@Component({
  selector: 'app-plam-admin',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, Footer2Component],
  templateUrl: './plam-admin.component.html',
  styleUrl: './plam-admin.component.css'
})
export class PlamAdminComponent {
  planes: Planes[] = [];

  mensajeEstado: string = '';
  mensajeExito: string = '';

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

  eliminar (id: number) {
    this.planesService.eliminarPlan(id).subscribe({
      next: (data) => {
        console.log(data);
        this.mensajeExito = 'Plan eliminado';
        this.actualizar();
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al eliminar';
      }
    });
  }

  actualizar() {
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
