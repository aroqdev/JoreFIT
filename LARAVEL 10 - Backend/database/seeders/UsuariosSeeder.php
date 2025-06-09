<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usuarios')->insert([
            [
                'id' => 1,
                'nombre' => 'Jonny',
                'apellido' => 'Doe',
                'correo' => 'jonny@jorefit.com',
                'contrasena' => Hash::make('Administrador10@'),
                'fecha_nacimiento' => '1990-01-01',
                'pesoActual' => 75.0,
                'pesoObjetivo' => 70.0,
                'nivel' => 'Avanzado',
                'rol' => 'Administrador'
            ],
            [
                'id' => 2,
                'nombre' => 'Juan',
                'apellido' => 'Pérez',
                'correo' => 'juanperez@email.com',
                'contrasena' => Hash::make('Usuario10@'),
                'fecha_nacimiento' => '1985-03-15',
                'pesoActual' => 80.0,
                'pesoObjetivo' => 75.0,
                'nivel' => 'Intermedio',
                'rol' => 'Usuario'
            ],
            [
                'id' => 3,
                'nombre' => 'María',
                'apellido' => 'López',
                'correo' => 'marialopez@email.com',
                'contrasena' => Hash::make('Usuario10@'),
                'fecha_nacimiento' => '1992-07-20',
                'pesoActual' => 65.0,
                'pesoObjetivo' => 60.0,
                'nivel' => 'Intermedio',
                'rol' => 'Usuario'
            ],
            [
                'id' => 4,
                'nombre' => 'Carlos',
                'apellido' => 'Ramírez',
                'correo' => 'carlosramirez@email.com',
                'contrasena' => Hash::make('Usuario10@'),
                'fecha_nacimiento' => '1988-11-10',
                'pesoActual' => 85.0,
                'pesoObjetivo' => 80.0,
                'nivel' => 'Aficionado',
                'rol' => 'Usuario'
            ],
            [
                'id' => 5,
                'nombre' => 'Ana',
                'apellido' => 'Torres',
                'correo' => 'anatorres@email.com',
                'contrasena' => Hash::make('Usuario10@'),
                'fecha_nacimiento' => '1995-05-05',
                'pesoActual' => 70.0,
                'pesoObjetivo' => 65.0,
                'nivel' => 'Aficionado',
                'rol' => 'Usuario'
            ],
        ]);        
    }
}
