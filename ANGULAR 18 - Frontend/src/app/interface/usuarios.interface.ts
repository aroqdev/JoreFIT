export interface Usuario{
  id: number;
  correo: string;
  contrasena: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: Date;
  altura: number;
  pesoActual: number;
  pesoObjetivo: number;
  nivel: string;
  rol: string;
  numero_tarjeta: string;
  nombre_titular: string;
  cvv: string;
  fecha_vencimiento: string;
}
