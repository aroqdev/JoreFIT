import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Planes } from '../interface/planes.interface';
import { EjerciciosService } from '../services/ejercicios.service';
import { PlanesService } from '../services/planes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../interface/usuarios.interface';
import { LocalService } from '../services/local.service';
import { Footer2Component } from "../footer2/footer2.component";

@Component({
  selector: 'app-ejer-asig',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, Footer2Component],
  templateUrl: './ejer-asig.component.html',
  styleUrl: './ejer-asig.component.css'
})
export class EjerAsigComponent {
  usuario!: Usuario;
  misEjercicios: any[] = [];
  selectedPlan!: Planes;
  selectedNivel: string = '';

  mensajeExito: string = '';

  constructor(private route: ActivatedRoute, private planesService: PlanesService,
    private ejerciciosService: EjerciciosService, private localService: LocalService) {
      this.usuario = this.localService.user!;
      this.selectedNivel = this.getIntensidad(this.usuario.nivel);
    }
  
  ngOnInit(): void {
    const planId = this.route.snapshot.params['planId'];
    
    this.planesService.mostrarUnSoloPlan(planId).subscribe({
      next: (data) => {
        console.log(data);
        this.selectedPlan = data.plan;
        this.ejerciciosService.losEjerciciosDeMiPlan(this.usuario.id, planId).subscribe({
          next: (data) => {
            console.log(data);
            this.misEjercicios  = data.ejerciciosAsignados;
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

  completar(id: number) {
    this.ejerciciosService.completarEjerciciosAsignados(id).subscribe({
      next: (data) => {
        console.log(data);
        this.actualizar();
        if (data.status == 201) {
          this.mensajeExito = '¡Felicidades! Has completado todos los ejercicios de este plan. Plan marcado como completado.';
        }
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  actualizar() {
    this.ejerciciosService.losEjerciciosDeMiPlan(this.usuario.id, this.selectedPlan.id).subscribe({
      next: (data) => {
        console.log(data);
        this.misEjercicios  = data.ejerciciosAsignados;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
