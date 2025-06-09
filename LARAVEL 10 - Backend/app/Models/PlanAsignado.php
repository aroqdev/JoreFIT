<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Plan;
use App\Models\Usuario;

class PlanAsignado extends Model
{
    use HasFactory;

    protected $table = 'planesasignados';

    protected $fillable = [
        'idPlan',
        'idUsu',
        'completado'
    ];

    // Relación con el modelo Plan
    public function plan()
    {
        return $this->belongsTo(Plan::class, 'idPlan');
    }

    // Relación con el modelo Usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'idUsu');
    }
}
