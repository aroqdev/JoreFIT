<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class PlanesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('planes')->insert([
            [
                'imagen' => 'assets/ganaciaMuscular.jfif',
                'nombre' => 'Ganancia Muscular',
                'descripcion' => 'Aumenta la masa muscular con entrenamiento de fuerza y superávit calórico.',
                'duracion' => 12,
                'precio' => 34.99
            ],
            [
                'imagen' => 'assets/definicion.jpg',
                'nombre' => 'Definición',
                'descripcion' => 'Reduce grasa corporal manteniendo masa muscular con entrenamiento de fuerza e HIIT.',
                'duracion' => 8,
                'precio' => 34.99
            ],
            [
                'imagen' => 'assets/perdidaDePeso.webp',
                'nombre' => 'Pérdida de Peso',
                'descripcion' => 'Programa de fuerza y cardio para maximizar la quema de grasa.',
                'duracion' => 10,
                'precio' => 34.99
            ],
            [
                'imagen' => 'assets/ejercicioCardiobascular.jpg',
                'nombre' => 'Ejercicio Cardiovascular',
                'descripcion' => 'Mejora la resistencia y quema calorías con sesiones de cardio variadas.',
                'duracion' => 6,
                'precio' => 34.99
            ]
        ]);
    }
}
