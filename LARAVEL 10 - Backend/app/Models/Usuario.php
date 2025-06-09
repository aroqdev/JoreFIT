<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\PlanAsignado;
use App\Models\EjercicioAsignado;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'usuarios';

    protected $fillable = [
        'correo',
        'contrasena',
        'nombre',
        'apellido',
        'fecha_nacimiento',
        'altura',
        'pesoActual',
        'pesoObjetivo',
        'nivel',
        'rol',
        'numero_tarjeta',
        'nombre_titular',
        'cvv',
        'fecha_vencimiento',
    ];

    // Relación con el modelo PlanAsignado
    public function planesAsignados()
    {
        return $this->hasMany(PlanAsignado::class, 'idUsu');
    }

    // Relación con el modelo EjercicioAsignado
    public function ejerciciosAsignados()
    {
        return $this->hasMany(EjercicioAsignado::class, 'idUsu');
    }
}
