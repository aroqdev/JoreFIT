import { Component } from '@angular/core';
import { Ejercicios } from '../interface/ejercicios.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EjerciciosService } from '../services/ejercicios.service';
import { Planes } from '../interface/planes.interface';
import { PlanesService } from '../services/planes.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Footer2Component } from "../footer2/footer2.component";

@Component({
  selector: 'app-update-ejercicio',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, Footer2Component, RouterLink],
  templateUrl: './update-ejercicio.component.html',
  styleUrl: './update-ejercicio.component.css'
})
export class UpdateEjercicioComponent {
  update: FormGroup;
  imagen: FormControl;
  nombre: FormControl;
  descripcion: FormControl;
  series: FormControl;
  repeticiones: FormControl;
  tipo: FormControl;
  musculo: FormControl;
  intensidad: FormControl;

  planes: Planes[] = [];
  selectedEjercicio?: Ejercicios;

  mensajeEstado: string = '';
  mensajeExito: string = '';

  constructor(private route: ActivatedRoute, private router: Router,
    private planesService: PlanesService, private ejerciciosService: EjerciciosService) {
      this.imagen = new FormControl('');
      this.nombre = new FormControl('');
      this.descripcion = new FormControl('');
      this.series = new FormControl('');
      this.repeticiones = new FormControl('');
      this.tipo = new FormControl('');
      this.musculo = new FormControl('');
      this.intensidad = new FormControl('');

      this.update = new FormGroup({
        imagen: this.imagen,
        nombre: this.nombre,
        descripcion: this.descripcion,
        series: this.series,
        repeticiones: this.repeticiones,
        tipo: this.tipo,
        musculo: this.musculo,
        intensidad: this.intensidad
      });
    }

  ngOnInit() {
    const planId = this.route.snapshot.params['ejerId'];

    this.ejerciciosService.mostrarUnSoloEjercicios(planId).subscribe({
      next: (data) => {
        console.log(data);
        this.selectedEjercicio = data.ejercicio;
      },
      error: (err) => {
        console.error('Error', err);
      }
    });

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

  actualizar() {
    const body: any = {}; // objeto dinámico

    if (this.update.value.imagen) body.imagen = this.update.value.imagen;
    if (this.update.value.nombre) body.nombres = this.update.value.nombre;
    if (this.update.value.descripcion) body.descripcion = this.update.value.descripcion;
    if (this.update.value.series) body.series = this.update.value.series;
    if (this.update.value.repeticiones) body.repeticiones = this.update.value.repeticiones;
    if (this.update.value.tipo) body.tipo = this.update.value.tipo;
    if (this.update.value.musculo) body.musculo = this.update.value.musculo;
    if (this.update.value.intensidad) body.intensidad = this.update.value.intensidad;

    this.ejerciciosService.modificarCampoEjercicios(this.selectedEjercicio!.id, body).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/admin/plans/', this.selectedEjercicio?.tipo]);
      },
      error: (err) => {
        console.error('Error', err);
        this.mensajeEstado = 'Error al actualizar';
      }
    });
  }
}
