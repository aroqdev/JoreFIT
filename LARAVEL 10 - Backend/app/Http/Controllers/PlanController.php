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

class PlanController extends Controller
{
    //PLANES
    public function mostrarPlan() {
        $planes = Plan::all();

        if ($planes->isEmpty()) {
            $data = [
                'message' => 'No se encontraron planes',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'planes' => $planes,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function mostrarUnSoloPlan($id) {
        $plan = Plan::find($id);

        if (!$plan) {
            $data = [
                'message' => 'Plan no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'plan' => $plan,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function crearPlan(Request $request) {
        $validator = Validator::make($request->all(), [
            'imagen' => 'nullable|string|max:255',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'duracion' => 'required|integer|min:0',
            'precio' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $plan = Plan::create([
            'imagen' => $request->imagen,
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'duracion' => $request->duracion,
            'precio' => $request->precio
        ]);

        if (!$plan) {
            $data = [
                'message' => 'Error al crear el plan',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'plan' => $plan,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function modificarPlan(Request $request, $id) {
        $plan = Plan::find($id);

        if (!$plan) {
            $data = [
                'message' => 'Plan no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'imagen' => 'nullable|string|max:255',
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'duracion' => 'required|integer|min:1',
            'precio' => 'required|numeric|min:0'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $plan->imagen = $request->imagen;
        $plan->nombre = $request->nombre;
        $plan->descripcion = $request->descripcion;
        $plan->duracion = $request->duracion;
        $plan->precio = $request->precio;
        $plan->save();

        $data = [
            'message' => 'Plan actualizado',
            'plan' => $plan,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function modificarCampoPlan(Request $request, $id) {
        $plan = Plan::find($id);

        if (!$plan) {
            $data = [
                'message' => 'Plan no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'imagen' => 'nullable|string|max:255',
            'nombre' => 'sometimes|required|string|max:255',
            'descripcion' => 'sometimes|required|string',
            'duracion' => 'sometimes|required|integer|min:1',
            'precio' => 'sometimes|required|numeric|min:0'
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
            $plan->imagen = $request->imagen;
        }

        if ($request->has('nombre')) {
            $plan->nombre = $request->nombre;
        }

        if ($request->has('descripcion')) {
            $plan->descripcion = $request->descripcion;
        }

        if ($request->has('duracion')) {
            $plan->duracion = $request->duracion;
        }

        if ($request->has('precio')) {
            $plan->precio = $request->precio;
        }

        $plan->save();

        $data = [
            'message' => 'Plan actualizado',
            'plan' => $plan,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function eliminarPlan($id) {
        $plan = Plan::find($id);

        if (!$plan) {
            $data = [
                'message' => 'Plan no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        Ejercicio::where('tipo', $plan->nombre)->delete();

        $plan->delete();

        $data = [
            'message' => 'Plan eliminado',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    //PLANES ASIGNADOS
    public function mostrarPlanesAsignados() {
        $planesAsignados = PlanAsignado::with(['plan', 'usuario'])->get();

        if ($planesAsignados->isEmpty()) {
            $data = [
                'message' => 'No se encontraron planes asignados',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'planesAsignados' => $planesAsignados,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function mostrarUnSoloPlanesAsignados($id) {
        // Se busca el plan asignado por su id, incluyendo las relaciones 'plan' y 'usuario'
        $planAsignado = PlanAsignado::with(['plan', 'usuario'])->find($id);

        // Verificamos si no se encuentra el plan asignado
        if (!$planAsignado) {
            $data = [
                'message' => 'Plan asignado no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404); // Se devuelve un mensaje con código 404
        }

        // Si se encuentra el plan asignado, se devuelve la información
        $data = [
            'planAsignado' => $planAsignado,
            'status' => 200
        ];

        return response()->json($data, 200); // Se devuelve la respuesta con código 200
    }

    public function crearPlanesAsignados(Request $request) {
        // Validación de los datos del request
        $validator = Validator::make($request->all(), [
            'idPlan' => 'required|exists:planes,id',
            'idUsu' => 'required|exists:usuarios,id',
            'completado' => 'nullable|boolean'
        ]);

        // Si la validación falla, se devuelve un error
        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        // Crear el nuevo plan asignado
        $planAsignado = PlanAsignado::create([
            'idPlan' => $request->idPlan,
            'idUsu' => $request->idUsu,
            'completado' => false
        ]);

        // Si no se puede crear el plan asignado, se devuelve un error
        if (!$planAsignado) {
            $data = [
                'message' => 'Error al crear el plan asignado',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        // Si el plan asignado se crea correctamente, se devuelve la respuesta
        $data = [
            'planAsignado' => $planAsignado,
            'status' => 201
        ];

        return response()->json($data, 201);
    }


    public function modificarPlanesAsignados(Request $request, $id) {
        // Buscar el plan asignado por su ID
        $planAsignado = PlanAsignado::find($id);

        if (!$planAsignado) {
            $data = [
                'message' => 'Plan asignado no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        // Validación de los datos del request
        $validator = Validator::make($request->all(), [
            'idPlan' => 'required|exists:planes,id',
            'idUsu' => 'required|exists:usuarios,id',
            'completado' => 'nullable|boolean'
        ]);

        // Si la validación falla, se devuelve un error
        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $planAsignado->idPlan = $request->idPlan;
        $planAsignado->idUsu = $request->idUsu;
        $planAsignado->completado = $request->completado;
        $planAsignado->save();

        // Respuesta de éxito
        $data = [
            'message' => 'Plan asignado actualizado',
            'planAsignado' => $planAsignado,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function modificarCampoPlanesAsignados(Request $request, $id) {
        // Buscar el plan asignado por su ID
        $planAsignado = PlanAsignado::find($id);

        if (!$planAsignado) {
            $data = [
                'message' => 'Plan asignado no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        // Validación de los datos del request
        $validator = Validator::make($request->all(), [
            'idPlan' => 'nullable|exists:planes,id',
            'idUsu' => 'nullable|exists:usuarios,id',
            'completado' => 'nullable|boolean'
        ]);

        // Si la validación falla, se devuelve un error
        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        // Actualizamos los campos con los datos proporcionados, si existen
        if ($request->has('idPlan')) {
            $planAsignado->idPlan = $request->idPlan;
        }
        if ($request->has('idUsu')) {
            $planAsignado->idUsu = $request->idUsu;
        }
        if ($request->has('completado')) {
            $planAsignado->completado = $request->completado;
        }

        // Guardamos los cambios
        $planAsignado->save();

        // Respuesta de éxito
        $data = [
            'message' => 'Plan asignado actualizado',
            'planAsignado' => $planAsignado,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function eliminarPlanesAsignados($id) {
        // Buscar el plan asignado por su ID
        $planAsignado = PlanAsignado::find($id);

        if (!$planAsignado) {
            $data = [
                'message' => 'Plan asignado no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        EjercicioAsignado::where('idPlan', $planAsignado->idPlan)
        ->where('idUsu', $planAsignado->idUsu)
        ->delete();

        // Eliminar el plan asignado
        $planAsignado->delete();

        // Respuesta de éxito
        $data = [
            'message' => 'Plan asignado eliminado',
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    //CONTRATAR PLAN
    public function contratarPlan(Request $request)
    {
        // ✅ Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'idUsu' => 'required|exists:usuarios,id',
            'idPlan' => 'required|exists:planes,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ], 400);
        }

        // ✅ Obtener el usuario y su nivel
        $usuario = Usuario::find($request->idUsu);
        $nivel = $usuario->nivel;

        // ✅ Determinar la intensidad basada en el nivel del usuario
        $intensidad = $this->getIntensidad($nivel);

        // ✅ Obtener el nombre del plan
        $plan = Plan::find($request->idPlan);

        if (!$plan) {
            return response()->json([
                'message' => 'El plan no existe.',
                'status' => 404
            ], 404);
        }

        // ✅ Buscar los ejercicios basados en el nombre del plan y la intensidad
        $ejercicios = Ejercicio::where('tipo', $plan->nombre)->where('intensidad', $intensidad)->get();

        if ($ejercicios->isEmpty()) {
            return response()->json([
                'message' => 'No hay ejercicios disponibles para este plan e intensidad.',
                'status' => 404
            ], 404);
        }

        // ✅ Registrar el plan en la tabla planesAsignados
        $planAsignado = PlanAsignado::create([
            'idPlan' => $request->idPlan,
            'idUsu' => $request->idUsu,
            'completado' => false
        ]);

        if (!$planAsignado) {
            return response()->json([
                'message' => 'Error al asignar el plan',
                'status' => 500
            ], 500);
        }

        // ✅ Registrar cada ejercicio en ejerciciosAsignados
        foreach ($ejercicios as $ejercicio) {
            EjercicioAsignado::create([
                'idPlan' => $request->idPlan,
                'idEjer' => $ejercicio->id,
                'idUsu' => $request->idUsu,
                'completado' => false
            ]);
        }

        return response()->json([
            'message' => 'Plan contratado y ejercicios asignados correctamente.',
            'planAsignado' => $planAsignado,
            'ejerciciosAsignados' => $ejercicios,
            'status' => 201
        ], 201);
    }

    // ✅ Función auxiliar para obtener la intensidad según el nivel
    private function getIntensidad($nivel)
    {
        $niveles = [
            'Aficionado' => 'Leve',
            'Intermedio' => 'Media',
            'Avanzado' => 'Alta'
        ];

        return $niveles[$nivel];
    }

    //VER MIS PLANES
    public function misPlanes($idUsu)
    {
        // ✅ Verificamos si el usuario existe
        $usuario = Usuario::find($idUsu);

        if (!$usuario) {
            return response()->json([
                'error' => 'Usuario no encontrado.'
            ], 404);
        }

        // ✅ Obtenemos los planes asignados con la información del plan
        $planesAsignados = PlanAsignado::where('idUsu', $idUsu)
            ->with('plan') // Carga la información completa del plan asignado
            ->get();

        if ($planesAsignados->isEmpty()) {
            return response()->json([
                'message' => 'El usuario no tiene planes asignados.'
            ], 200);
        }

        return response()->json([
            'planesAsignados' => $planesAsignados
        ], 200);
    }
}
