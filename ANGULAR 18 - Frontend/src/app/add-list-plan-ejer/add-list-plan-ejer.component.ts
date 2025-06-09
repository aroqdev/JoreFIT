import { Component } from '@angular/core';
import { Planes } from '../interface/planes.interface';
import { PlanesService } from '../services/planes.service';
import { EjerciciosService } from '../services/ejercicios.service';
import { Ejercicios } from '../interface/ejercicios.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Usuario } from '../interface/usuarios.interface';
import { LocalService } from '../services/local.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-list-plan-ejer',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './add-list-plan-ejer.component.html',
  styleUrl: './add-list-plan-ejer.component.css'
})
export class AddListPlanEjerComponent {
  usuario!: Usuario;
  planes: Planes[] = [];
  ejercicios: Ejercicios[] = [];
  selectedPlan?: Planes;
  selectedEjercicios : Ejercicios [] = [];
  selectedNivel: string = '';

  constructor(private route: ActivatedRoute,
    private planesService: PlanesService,
    private ejerciciosService: EjerciciosService,
    private localService: LocalService) {
      this.usuario = this.localService.user!;
      this.selectedNivel = this.getIntensidad(this.usuario.nivel);
    }

  ngOnInit(): void {
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

  getIntensidad(nivel: string): string {
    switch (nivel.toLowerCase()) {
      case 'aficionado':
        return 'Leve';
      case 'intermedio':
        return 'Media';
      case 'avanzado':
        return 'Alta';
      default:
        return 'Leve';
    }
  }
}
