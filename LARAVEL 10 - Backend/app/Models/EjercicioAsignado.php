<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Plan;
use App\Models\Ejercicio;
use App\Models\Usuario;

class EjercicioAsignado extends Model
{
    use HasFactory;

    protected $table = 'ejerciciosasignados';

    protected $fillable = [
        'idPlan',
        'idEjer',
        'idUsu',
        'completado'
    ];

    // Relación con el modelo Plan
    public function plan()
    {
        return $this->belongsTo(Plan::class, 'idPlan');
    }

    // Relación con el modelo Ejercicio
    public function ejercicio()
    {
        return $this->belongsTo(Ejercicio::class, 'idEjer');
    }

    // Relación con el modelo Usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'idUsu');
    }
}
