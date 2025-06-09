<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Tabla usuarios
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->string('correo')->unique();
            $table->string('contrasena');
            $table->string('nombre', 50);
            $table->string('apellido', 50);
            $table->date('fecha_nacimiento');
            $table->double('altura')->nullable();
            $table->double('pesoActual');
            $table->double('pesoObjetivo');
            $table->string('nivel');
            $table->string('rol');
            $table->string('numero_tarjeta', 20)->nullable();
            $table->string('nombre_titular', 100)->nullable();
            $table->string('cvv', 3)->nullable();
            $table->string('fecha_vencimiento')->nullable();
            $table->string('recovery_code')->nullable();
            $table->timestamp('code_expires_at')->nullable();
            $table->timestamps();
        });

        // Tabla planes
        Schema::create('planes', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100);
            $table->string('descripcion', 255);
            $table->integer('duracion')->unsigned();
            $table->double('precio', 8, 2);
            $table->text('imagen');
            $table->timestamps();
        });

        // Tabla ejercicios
        Schema::create('ejercicios', function (Blueprint $table) {
            $table->id();
            $table->text('imagen');
            $table->string('nombres', 100);
            $table->text('descripcion');
            $table->integer('series')->unsigned();
            $table->string('repeticiones');
            $table->string('tipo', 100);
            $table->string('musculo', 50);
            $table->string('intensidad');
            $table->timestamps();
        });

        // Tabla planesAsignados
        Schema::create('planesAsignados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idPlan');
            $table->unsignedBigInteger('idUsu');
            $table->boolean('completado')->default(false);

            $table->foreign('idPlan')->references('id')->on('planes')->onDelete('cascade');
            $table->foreign('idUsu')->references('id')->on('usuarios')->onDelete('cascade');

            $table->timestamps();
        });

        // Tabla ejerciciosAsignados
        Schema::create('ejerciciosAsignados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('idPlan');
            $table->unsignedBigInteger('idEjer');
            $table->unsignedBigInteger('idUsu');
            $table->boolean('completado')->default(false);

            $table->foreign('idPlan')->references('id')->on('planes')->onDelete('cascade');
            $table->foreign('idEjer')->references('id')->on('ejercicios')->onDelete('cascade');
            $table->foreign('idUsu')->references('id')->on('usuarios')->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ejerciciosAsignados');
        Schema::dropIfExists('planesAsignados');
        Schema::dropIfExists('ejercicios');
        Schema::dropIfExists('planes');
        Schema::dropIfExists('usuarios');
    }
};
