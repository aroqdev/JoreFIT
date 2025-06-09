<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Models\Usuario;
use App\Models\Plan;
use App\Models\Ejercicio;
use App\Models\PlanAsignado;
use App\Models\EjercicioAsignado;
use Illuminate\Validation\ValidationException;

class EjercicioController extends Controller
{
    //EJERCICIOS
    public function mostrarEjercicios() {
        $ejercicios = Ejercicio::all();

        if ($ejercicios->isEmpty()) {
            $data = [
                'message' => 'No se encontraron ejercicios',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'ejercicios' => $ejercicios,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function mostrarUnSoloEjercicios($id) {
        $ejercicio = Ejercicio::find($id);

        if (!$ejercicio) {
            $data = [
                'message' => 'Ejercicio no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'ejercicio' => $ejercicio,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function crearEjercicios(Request $request) {
        $validator = Validator::make($request->all(), [
            'imagen' => 'nullable|string|max:255',
            'nombres' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'series' => 'required|integer|min:1',
            'repeticiones' => 'required|string|max:255',
            'tipo' => 'required|string|max:255|exists:planes,nombre',
            'musculo' => 'required|string|in:Pecho,Espalda,Brazo,Pierna,Corporal',
            'intensidad' => 'required|string|in:Leve,Media,Alta'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $ejercicio = Ejercicio::create([
            'imagen' => $request->imagen,
            'nombres' => $request->nombres,
            'descripcion' => $request->descripcion,
            'series' => $request->series,
            'repeticiones' => $request->repeticiones,
            'tipo' => $request->tipo,
            'musculo' => $request->musculo,
            'intensidad' => $request->intensidad
        ]);

        if (!$ejercicio) {
            $data = [
                'message' => 'Error al crear el ejercicio',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'ejercicio' => $ejercicio,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function modificarEjercicios(Request $request, $id) {
        $ejercicio = Ejercicio::find($id);

        if (!$ejercicio) {
            $data = [
                'message' => 'Ejercicio no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'imagen' => 'nullable|string|max:255',
            'nombres' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'series' => 'required|integer|min:1',
            'repeticiones' => 'required|string|max:255',
            'tipo' => 'required|string|max:255|exists:planes,nombre',
            'musculo' => 'required|string|in:Pecho,Espalda,Brazo,Pierna,Corporal',
            'intensidad' => 'required|string|in:Leve,Media,Alta'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $ejercicio->imagen = $request->imagen;
        $ejercicio->nombres = $request->nombres;
        $ejercicio->descripcion = $request->descripcion;
        $ejercicio->series = $request->series;
        $ejercicio->repeticiones = $request->repeticiones;
        $ejercicio->tipo = $request->tipo;
        $ejercicio->musculo = $request->musculo;
        $ejercicio->intensidad = $request->intensidad;
        $ejercicio->save();

        $data = [
            'message' => 'Ejercicio actualizado',
            'ejercicio' => $ejercicio,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function modificarCampoEjercicios(Request $request, $id) {
        $ejercicio = Ejercicio::find($id);

        if (!$ejercicio) {
            $data = [
                'message' => 'Ejercicio no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'imagen' => 'string|max:255',
            'nombres' => 'string|max:255',
            'descripcion' => 'string',
            'series' => 'integer|min:1',
            'repeticiones' => 'string|max:255',
            'tipo' => 'string|max:255|exists:planes,nombre',
            'musculo' => 'string|in:Pecho,Espalda,Brazo,Pierna,Corporal',
            'intensidad' => 'string|in:Leve,Media,Alta'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if ($request->has('imagen')) {
            $ejercicio->imagen = $request->imagen;
        }

        if ($request->has('nombres')) {
            $ejercicio->nombres = $request->nombres;
        }

        if ($request->has('descripcion')) {
            $ejercicio->descripcion = $request->descripcion;
        }

        if ($request->has('series')) {
            $ejercicio->series = $request->series;
        }

        if ($request->has('repeticiones')) {
            $ejercicio->repeticiones = $request->repeticiones;
        }

        if ($request->has('tipo')) {
            $ejercicio->tipo = $request->tipo;
        }

        if ($request->has('musculo')) {
            $ejercicio->musculo = $request->musculo;
        }

        if ($request->has('intensidad')) {
            $ejercicio->intensidad = $request->intensidad;
        }

        $ejercicio->save();

        $data = [
            'message' => 'Ejercicio actualizado',
            'ejercicio' => $ejercicio,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function eliminarEjercicios($id) {
        $ejercicio = Ejercicio::find($id);

        if (!$ejercicio) {
            $data = [
                'message' => 'Ejercicio no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $ejercicio->delete();

        $data = [
            'message' => 'Ejercicio eliminado',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    //EJERCICIOS ASIGNADOS
    public function mostrarEjerciciosAsignados() {
        // Obtenemos todos los ejercicios asignados con los datos relacionados
        $ejerciciosAsignados = EjercicioAsignado::with(['plan', 'ejercicio', 'usuario'])->get();

        if ($ejerciciosAsignados->isEmpty()) {
            $data = [
                'message' => 'No se encontraron ejercicios asignados',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'ejerciciosAsignados' => $ejerciciosAsignados,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function mostrarUnSoloEjerciciosAsignados($id) {
        // Buscamos el ejercicio asignado por su ID
        $ejercicioAsignado = EjercicioAsignado::with(['plan', 'ejercicio', 'usuario'])->find($id);

        // Verificamos si el ejercicio asignado existe
        if (!$ejercicioAsignado) {
            $data = [
                'message' => 'Ejercicio asignado no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        // Si el ejercicio asignado existe, devolvemos los datos con sus relaciones
        $data = [
            'ejercicioAsignado' => $ejercicioAsignado,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function crearEjerciciosAsignados(Request $request) {
        // Validar los datos recibidos
        $validator = Validator::make($request->all(), [
            'idPlan' => 'required|exists:planes,id', // Asegura que el plan exista
            'idEjer' => 'required|exists:ejercicios,id', // Asegura que el ejercicio exista
            'idUsu' => 'required|exists:usuarios,id', // Asegura que el usuario exista
            'completado' => 'nullable|boolean'
        ]);

        // Si la validación falla
        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        // Crear el ejercicio asignado
        $ejercicioAsignado = EjercicioAsignado::create([
            'idPlan' => $request->idPlan,
            'idEjer' => $request->idEjer,
            'idUsu' => $request->idUsu,
            'completado' => false
        ]);

        // Si no se pudo crear el ejercicio asignado
        if (!$ejercicioAsignado) {
            $data = [
                'message' => 'Error al crear el ejercicio asignado',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        // Respuesta de éxito
        $data = [
            'ejercicioAsignado' => $ejercicioAsignado,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function modificarEjerciciosAsignados(Request $request, $id) {
        // Buscar el ejercicio asignado por su ID
        $ejercicioAsignado = EjercicioAsignado::find($id);

        if (!$ejercicioAsignado) {
            $data = [
                'message' => 'Ejercicio asignado no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        // Validar los datos recibidos
        $validator = Validator::make($request->all(), [
            'idPlan' => 'nullable|exists:planes,id', // Si se pasa, debe existir en la tabla 'planes'
            'idEjer' => 'nullable|exists:ejercicios,id', // Si se pasa, debe existir en la tabla 'ejercicios'
            'idUsu' => 'nullable|exists:usuarios,id', // Si se pasa, debe existir en la tabla 'usuarios'
            'completado' => 'nullable|boolean'
        ]);

        // Si la validación falla
        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $ejercicioAsignado->idPlan = $request->idPlan;
        $ejercicioAsignado->idEjer = $request->idEjer;
        $ejercicioAsignado->idUsu = $request->idUsu;
        $ejercicioAsignado->completado = $request->completado;
        $ejercicioAsignado->save();

        // Responder con los datos actualizados
        $data = [
            'message' => 'Ejercicio asignado actualizado',
            'ejercicioAsignado' => $ejercicioAsignado,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function modificarCampoEjerciciosAsignados(Request $request, $id) {
        // Buscar el ejercicio asignado por su ID
        $ejercicioAsignado = EjercicioAsignado::find($id);

        if (!$ejercicioAsignado) {
            $data = [
                'message' => 'Ejercicio asignado no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        // Validar los datos recibidos
        $validator = Validator::make($request->all(), [
            'idPlan' => 'nullable|exists:planes,id', // Si se pasa, debe existir en la tabla 'planes'
            'idEjer' => 'nullable|exists:ejercicios,id', // Si se pasa, debe existir en la tabla 'ejercicios'
            'idUsu' => 'nullable|exists:usuarios,id', // Si se pasa, debe existir en la tabla 'usuarios'
            'completado' => 'nullable|boolean'
        ]);

        // Si la validación falla
        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        // Actualizar solo los campos que se pasen en el request
        if ($request->has('idPlan')) {
            $ejercicioAsignado->idPlan = $request->idPlan;
        }
        if ($request->has('idEjer')) {
            $ejercicioAsignado->idEjer = $request->idEjer;
        }
        if ($request->has('idUsu')) {
            $ejercicioAsignado->idUsu = $request->idUsu;
        }
        if ($request->has('completado')) {
            $ejercicioAsignado->completado = $request->completado;
        }

        // Guardar los cambios en el modelo
        $ejercicioAsignado->save();

        // Responder con los datos actualizados
        $data = [
            'message' => 'Ejercicio asignado actualizado',
            'ejercicioAsignado' => $ejercicioAsignado,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function eliminarEjerciciosAsignados($id) {
        // Buscar el ejercicio asignado por su ID
        $ejercicioAsignado = EjercicioAsignado::find($id);

        if (!$ejercicioAsignado) {
            $data = [
                'message' => 'Ejercicio asignado no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        // Eliminar el ejercicio asignado
        $ejercicioAsignado->delete();

        $data = [
            'message' => 'Ejercicio asignado eliminado',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    //VER LOS EJERCICIOS DE MI PLAN
    public function losEjerciciosDeMiPlan($idUsu, $idPlan)
    {
        // ✅ Verificamos si el usuario existe
        $usuario = Usuario::find($idUsu);

        if (!$usuario) {
            return response()->json([
                'error' => 'Usuario no encontrado.'
            ], 404);
        }

        // ✅ Verificamos si el usuario tiene asignado ese plan
        $planAsignado = PlanAsignado::where('idUsu', $idUsu)
            ->where('idPlan', $idPlan)
            ->first();

        if (!$planAsignado) {
            return response()->json([
                'error' => 'El usuario no tiene asignado este plan.'
            ], 404);
        }

        // ✅ Obtenemos los ejercicios asignados a este usuario y a este plan
        $ejerciciosAsignados = EjercicioAsignado::where('idUsu', $idUsu)
            ->where('idPlan', $idPlan)
            ->with('ejercicio') // Carga la información completa del ejercicio
            ->get();

        if ($ejerciciosAsignados->isEmpty()) {
            return response()->json([
                'message' => 'No hay ejercicios asignados para este plan.'
            ], 200);
        }

        return response()->json([
            'ejerciciosAsignados' => $ejerciciosAsignados
        ], 200);
    }

    //VER OPCIONES PARA CAMBIAR DE EJERCICIO ASIGNADO
    public function cambiarEjerciciosAsignados($idEjerAsignado)
    {
        // ✅ Verificamos si el ejercicio asignado existe
        $ejercicioAsignado = EjercicioAsignado::find($idEjerAsignado);

        if (!$ejercicioAsignado) {
            return response()->json([
                'error' => 'Ejercicio asignado no encontrado.'
            ], 404);
        }

        // ✅ Obtenemos ejercicios del mismo tipo (plan) pero con cualquier intensidad
        $ejerciciosDisponibles = Ejercicio::where('tipo', $ejercicioAsignado->ejercicio->tipo)
            ->where('id', '!=', $ejercicioAsignado->idEjer) // Excluir el ejercicio actual
            ->get();

        if ($ejerciciosDisponibles->isEmpty()) {
            return response()->json([
                'message' => 'No hay otros ejercicios disponibles para este plan.'
            ], 200);
        }

        return response()->json([
            'ejerciciosDisponibles' => $ejerciciosDisponibles
        ], 200);
    }

    //VER OPCIONES PARA CAMBIAR DE EJERCICIO ASIGNADO
    public function actualizarEjerciciosAsignados($idEjerAsignado, Request $request)
    {
        // ✅ Validamos la entrada
        $request->validate([
            'idNuevoEjercicio' => 'required|exists:ejercicios,id',
        ]);

        // ✅ Verificamos si el ejercicio asignado existe
        $ejercicioAsignado = EjercicioAsignado::find($idEjerAsignado);

        if (!$ejercicioAsignado) {
            return response()->json([
                'error' => 'Ejercicio asignado no encontrado.'
            ], 404);
        }

        // ✅ Verificamos que el nuevo ejercicio pertenece al mismo tipo (plan)
        $nuevoEjercicio = Ejercicio::find($request->idNuevoEjercicio);

        if ($nuevoEjercicio->tipo !== $ejercicioAsignado->ejercicio->tipo) {
            return response()->json([
                'error' => 'El nuevo ejercicio no pertenece al mismo plan.'
            ], 400);
        }

        // ✅ Verificamos que el nuevo ejercicio no esté ya asignado al mismo usuario y plan
        $existeYaAsignado = EjercicioAsignado::where('idUsu', $ejercicioAsignado->idUsu)
        ->where('idPlan', $ejercicioAsignado->idPlan)
        ->where('idEjer', $nuevoEjercicio->id)
        ->exists();

        if ($existeYaAsignado) {
            return response()->json([
                'error' => 'Este ejercicio ya está asignado a este usuario en el mismo plan.'
            ], 400);
        }

        // ✅ Actualizamos el ejercicio asignado
        $ejercicioAsignado->idEjer = $nuevoEjercicio->id;
        $ejercicioAsignado->save();

        return response()->json([
            'message' => 'Ejercicio asignado actualizado correctamente.',
            'nuevoEjercicio' => $nuevoEjercicio
        ], 200);
    }

    //ACTUALIZAR ESTADO DEL EJERCICIO Y DEL PLAN
    public function completarEjerciciosAsignados($idEjercicioAsignado)
    {
        // Buscar el ejercicio asignado
        $ejercicioAsignado = EjercicioAsignado::find($idEjercicioAsignado);

        if (!$ejercicioAsignado) {
            return response()->json(['error' => 'Ejercicio asignado no encontrado'], 404);
        }

        // Marcar el ejercicio como completado
        $ejercicioAsignado->completado = true;
        $ejercicioAsignado->save();

        // Obtener todos los ejercicios asignados de ese plan
        $ejerciciosPendientes = EjercicioAsignado::where('idPlan', $ejercicioAsignado->idPlan)
            ->where('idUsu', $ejercicioAsignado->idUsu)
            ->where('completado', false)
            ->exists(); // Verificar si hay ejercicios pendientes

        // Si no hay ejercicios pendientes, marcar el plan como completado
        if (!$ejerciciosPendientes) {
            PlanAsignado::where('idPlan', $ejercicioAsignado->idPlan)
                ->update(['completado' => true]);

            return response()->json([
                'message' => '¡Felicidades! Has completado todos los ejercicios de este plan. Plan marcado como completado.'
            ], 201); // Código 201 indica que algo más se creó o cambió significativamente
        }

        return response()->json(['message' => 'Ejercicio completado correctamente'], 200);
    }
}
