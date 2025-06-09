<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EjercicioAsignado;

class Ejercicio extends Model
{
    use HasFactory;

    protected $table = 'ejercicios';

    protected $fillable = [
        'imagen',
        'nombres',
        'descripcion',
        'series',
        'repeticiones',
        'tipo',
        'musculo',
        'intensidad'
    ];

    // Relación con el modelo EjercicioAsignado
    public function ejerciciosAsignados()
    {
        return $this->hasMany(EjercicioAsignado::class, 'idEjer');
    }
}
