import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Planes } from '../interface/planes.interface';
import { PlanesService } from '../services/planes.service';
import { Usuario } from '../interface/usuarios.interface';
import { LocalService } from '../services/local.service';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent {
  usuario!: Usuario;
  planes: Planes[] = [];
  selectedPlan?: Planes;

  constructor(private route: ActivatedRoute, private localService: LocalService,
    private planesService: PlanesService, private router: Router) {
      this.usuario = this.localService.user!;
    }

  ngOnInit(): void {
    const planId = this.route.snapshot.params['planId'];

    this.planesService.mostrarPlan().subscribe({
      next: (data) => {
        console.log(data);
        this.planes = data.planes;
        this.selectedPlan = this.getPlan(planId);
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }

  getPlan(name: string): Planes | undefined{
    return this.planes.find((plan) => plan.nombre === name);
  }

  getUltimosDigitos(numeroTarjeta: string): string {
    return numeroTarjeta.slice(-3);
  }

  contratar() {
    this.planesService.contratarPlan(this.usuario.id, this.selectedPlan!.id).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigate(['/profile/send']);
      },
      error: (err) => {
        console.error('Error', err);
      }
    });
  }
}
