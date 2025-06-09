import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { LocalService } from './services/local.service';
import { Usuario } from './interface/usuarios.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'JoreFit';
  usuario: Usuario | null = null;

  constructor(private localService: LocalService) {}

  ngOnInit(): void {
    this.usuario = this.localService.user;
  }
  ngDoCheck(): void {
    this.usuario = this.localService.user;
  }
}