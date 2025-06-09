import { Component } from '@angular/core';
import { Planes } from '../interface/planes.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlanesService } from '../services/planes.service';
import { EjerciciosService } from '../services/ejercicios.service';
import { Ejercicios } from '../interface/ejercicios.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-plans-ejer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './list-plans-ejer.component.html',
  styleUrl: './list-plans-ejer.component.css'
})
export class ListPlansEjerComponent {
  planes: Planes[] = [];
  ejercicios: Ejercicios[] = [];
  selectedPlan?: Planes;
  selectedEjercicios : Ejercicios [] = [];
  selectedNivel: string = 'Leve';

  constructor(private route: ActivatedRoute,
    private planesService: PlanesService,
    private ejerciciosService: EjerciciosService) { }

    ngOnInit() {
      const planId = this.route.snapshot.params['planId'];

      this.planesService.mostrarPlan().subscribe({
        next: (data) => {
          console.log(data);
          this.planes = data.planes;
          this.selectedPlan = this.getPlan(planId);
          this.ejerciciosService.mostrarEjercicios().subscribe({
            next: (data) => {
              console.log(data);
              this.ejercicios = data.ejercicios;
              this.selectedEjercicios = this.getEjerNivel(this.selectedNivel, this.selectedPlan?.nombre);
            },
            error: (err) => {
              console.error('Error', err);
            }
          });
        },
        error: (err) => {
          console.error('Error', err);
        }
      });
    }

    getPlan(name: string): Planes | undefined{
      return this.planes.find((plan) => plan.nombre === name);
    }

    getEjerNivel(intensidad: string, tipo: string | undefined): Ejercicios[]{
      return this.ejercicios.filter((ejercicio) => ejercicio.intensidad === intensidad && ejercicio.tipo === tipo);
    }

    filtrar() {
      this.ejerciciosService.mostrarEjercicios().subscribe({
        next: (data) => {
          console.log(data);
          this.ejercicios = data.ejercicios;
          this.selectedEjercicios = this.getEjerNivel(this.selectedNivel, this.selectedPlan?.nombre);
        },
        error: (err) => {
          console.error('Error', err);
        }
      });
    }
}
