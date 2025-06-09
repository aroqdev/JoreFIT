<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\PlanController;
use App\Http\Controllers\EjercicioController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//RUTAS SOBRE LOS USUSARIOS
Route::get('/user/All', [UsuarioController::class, 'mostrarUser']);
Route::get('/user/Only/{id}', [UsuarioController::class, 'mostrarUnSoloUser']);
Route::post('/user/VerifyEmail', [UsuarioController::class, 'verificarEmail']);
Route::post('/user/Create', [UsuarioController::class, 'crearUser']);
Route::post('/user/Login', [UsuarioController::class, 'loginUser']);
Route::post('/user/SendCode', [UsuarioController::class, 'enviarCode']);
Route::post('/user/VerifyCode', [UsuarioController::class, 'verificarCode']);
Route::post('/user/VerifyPassword', [UsuarioController::class, 'verificarPassword']);
Route::post('/user/ChangePassword', [UsuarioController::class, 'cambiarPassword']);
Route::put('/user/Modify/{id}', [UsuarioController::class, 'modificarUser']);
Route::patch('/user/ModifyCamp/{id}', [UsuarioController::class, 'modificarCampoUser']);
Route::middleware(['auth:sanctum', 'role.administrador'])->group(function () {
    Route::delete('/user/Delete/{id}', [UsuarioController::class, 'eliminarUser']);
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/user/Logout', function (Request $request) {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logout exitoso'], 200);
    });
});

//RUTAS SOBRE LOS PLANES
Route::get('/planes/All', [PlanController::class, 'mostrarPlan']);
Route::get('/planes/Only/{id}', [PlanController::class, 'mostrarUnSoloPlan']);
Route::middleware(['auth:sanctum', 'role.administrador'])->group(function () {
    Route::post('/planes/Create', [PlanController::class, 'crearPlan']);
    Route::put('/planes/Modify/{id}', [PlanController::class, 'modificarPlan']);
    Route::patch('/planes/ModifyCamp/{id}', [PlanController::class, 'modificarCampoPlan']);
    Route::delete('/planes/Delete/{id}', [PlanController::class, 'eliminarPlan']);
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/planes/Hire', [PlanController::class, 'contratarPlan']);
});

//RUTAS SOBRE LOS PLANES ASIGNADOS
Route::get('/planesAsignados/All', [PlanController::class, 'mostrarPlanesAsignados']);
Route::get('/planesAsignados/Only/{id}', [PlanController::class, 'mostrarUnSoloPlanesAsignados']);
Route::middleware(['auth:sanctum', 'role.administrador'])->group(function () {
    Route::delete('/planesAsignados/Delete/{id}', [PlanController::class, 'eliminarPlanesAsignados']);
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/planesAsignados/Create', [PlanController::class, 'crearPlanesAsignados']);
    Route::put('/planesAsignados/Modify/{id}', [PlanController::class, 'modificarPlanesAsignados']);
    Route::patch('/planesAsignados/ModifyCamp/{id}', [PlanController::class, 'modificarCampoPlanesAsignados']);

    Route::get('/planesAsignados/SeeMy/{id}', [PlanController::class, 'misPlanes']);
});

//RUTAS SOBRE LOS EJERCICIOS
Route::get('/ejercicios/All', [EjercicioController::class, 'mostrarEjercicios']);
Route::get('/ejercicios/Only/{id}', [EjercicioController::class, 'mostrarUnSoloEjercicios']);
Route::middleware(['auth:sanctum', 'role.administrador'])->group(function () {
    Route::post('/ejercicios/Create', [EjercicioController::class, 'crearEjercicios']);
    Route::put('/ejercicios/Modify/{id}', [EjercicioController::class, 'modificarEjercicios']);
    Route::patch('/ejercicios/ModifyCamp/{id}', [EjercicioController::class, 'modificarCampoEjercicios']);
    Route::delete('/ejercicios/Delete/{id}', [EjercicioController::class, 'eliminarEjercicios']);
});

//RUTAS SOBRE LOS EJERCICIOS ASIGNADOS
Route::get('/ejerciciosAsignados/All', [EjercicioController::class, 'mostrarEjerciciosAsignados']);
Route::get('/ejerciciosAsignados/Only/{id}', [EjercicioController::class, 'mostrarUnSoloEjerciciosAsignados']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/ejerciciosAsignados/Create', [EjercicioController::class, 'crearEjerciciosAsignados']);
    Route::put('/ejerciciosAsignados/Modify/{id}', [EjercicioController::class, 'modificarEjerciciosAsignados']);
    Route::patch('/ejerciciosAsignados/ModifyCamp/{id}', [EjercicioController::class, 'modificarCampoEjerciciosAsignados']);
    Route::delete('/ejerciciosAsignados/Delete/{id}', [EjercicioController::class, 'eliminarEjerciciosAsignados']);

    Route::get('/ejerciciosAsignados/SeeMy/{idUsu}/{idPlan}', [EjercicioController::class, 'losEjerciciosDeMiPlan']);
    Route::get('/ejerciciosAsignados/Change/{id}', [EjercicioController::class, 'cambiarEjerciciosAsignados']);
    Route::patch('/ejerciciosAsignados/Update/{id}', [EjercicioController::class, 'actualizarEjerciciosAsignados']);
    Route::patch('/ejerciciosAsignados/Complete/{id}', [EjercicioController::class, 'completarEjerciciosAsignados']);
});
