<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\EjercicioAsignado;

class Plan extends Model
{
    use HasFactory;

    protected $table = 'planes';

    protected $fillable = [
        'imagen',
        'nombre',
        'descripcion',
        'duracion',
        'precio'
    ];

    // Relación con el modelo PlanAsignado
    public function planesAsignados()
    {
        return $this->hasMany(PlanAsignado::class, 'idPlan');
    }

    // Relación con el modelo EjercicioAsignado
    public function ejerciciosAsignados()
    {
        return $this->hasMany(EjercicioAsignado::class, 'idPlan');
    }
}
