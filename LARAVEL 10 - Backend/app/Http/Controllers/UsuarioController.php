<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\Usuario;
use Illuminate\Support\Facades\Mail;
use App\Mail\CodigoRecuperacionMail;

class UsuarioController extends Controller
{
    public function mostrarUser() {
        $usuarios = Usuario::all();

        if ($usuarios->isEmpty()) {
            $data = [
                'message' => 'No se encontraron usuarios',
                'status' => 200
            ];
            return response()->json($data, 404);
        }

        $data = [
            'users' => $usuarios,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function mostrarUnSoloUser($id) {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $data = [
            'user' => $usuario,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function verificarEmail(Request $request) {
        $validator = Validator::make($request->all(), [
            'correo' => 'required|email|string|max:255|exists:usuarios,correo'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422); // Código 422 para validaciones
        }

        $usuario = Usuario::where('correo', $request->correo)->first();

        if ($usuario) {
            return response()->json(['message' => 'Correo encontrado'], 200); // Correo EXISTE
        }

        return response()->json(['error' => 'Correo no encontrado'], 404);
    }

    public function crearUser(Request $request) {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'correo' => 'required|email|string|max:255|unique:usuarios,correo',
            'contrasena' => ['required','string','min:8','max:16','regex:/[a-zA-Z]/','regex:/[0-9]/','regex:/[\W]/'],
            'fecha_nacimiento' => 'required|date',
            'pesoActual' => 'required|numeric|min:0',
            'pesoObjetivo' => 'required|numeric|min:0',
            'nivel' => 'required|string|in:Aficionado,Intermedio,Avanzado',
            'rol' => 'required|string|in:Usuario,Administrador'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $usuario = Usuario::create([
            'nombre' => $request->nombre,
            'apellido' => $request->apellido,
            'correo' => $request->correo,
            'contrasena' => bcrypt($request->contrasena),
            'fecha_nacimiento' => $request->fecha_nacimiento,
            'pesoActual' => $request->pesoActual,
            'pesoObjetivo' => $request->pesoObjetivo,
            'nivel' => $request->nivel,
            'rol' => $request->rol
        ]);

        if (!$usuario) {
            $data = [
                'message' => 'Error al crear el usuario',
                'status' => 500
            ];
            return response()->json($data, 500);
        }

        $data = [
            'usuario' => $usuario,
            'status' => 201
        ];

        return response()->json($data, 201);
    }

    public function loginUser(Request $request) {
        // Validar que los campos email y password estén presentes
        $validator = Validator::make($request->all(), [
            'correo' => 'required|email|string|max:255|exists:usuarios,correo',
            'contrasena' => ['required','string','min:8','max:16','regex:/[a-zA-Z]/','regex:/[0-9]/','regex:/[\W]/'],
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        // Verificar si el usuario existe
        $usuario = Usuario::where('correo', $request->correo)->first();

        if (!$usuario) {
            $data = [
                'message' => 'Correo electrónico no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        // Verificar que la contraseña sea correcta
        if (!Hash::check($request->contrasena, $usuario->contrasena)) {
            $data = [
                'message' => 'Contraseña incorrecta',
                'status' => 401
            ];
            return response()->json($data, 401);
        }

        // Si todo es correcto, generar el token de acceso (si usas API Token o JWT)
        $token = $usuario->createToken('AppToken')->plainTextToken;

        $data = [
            'message' => 'Login exitoso',
            'user' => $usuario,
            'token' => $token,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function enviarCode(Request $request) {
        $request->validate(['correo' => 'required|email|string|max:255|exists:usuarios,correo']);

        $usuario = Usuario::where('correo', $request->correo)->first();

        if (!$usuario) {
            $data = [
                'message' => 'Correo electrónico no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        // Generar un código aleatorio de 5 dígitos
        $codigo = random_int(10000, 99999);

        // Guardar el código en la base de datos (puedes usar un campo específico o una tabla de recuperación)
        $usuario->recovery_code = $codigo;
        $usuario->code_expires_at = now()->addMinutes(10); // Establece un tiempo de expiración
        $usuario->save();

        // Enviar el código por correo electrónico
        Mail::to($usuario->correo)->send(new CodigoRecuperacionMail($codigo));

        return response()->json(['message' => 'Código enviado al correo electrónico']);
    }

    public function verificarCode(Request $request) {
        $request->validate([
            'correo' => 'required|email|string|max:255|exists:usuarios,correo',
            'code' => 'required'
        ]);

        $usuario = Usuario::where('correo', $request->correo)->first();

        if (!$usuario) {
            $data = [
                'message' => 'Correo electrónico no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        // Verificar que el código sea correcto y no haya expirado
        if ($usuario->recovery_code != $request->code || $usuario->code_expires_at < now()) {
            return response()->json(['error' => 'Código inválido o expirado'], 400);
        }

        // Código válido, restablecer el recovery_code para evitar reutilización
        $usuario->recovery_code = null;
        $usuario->code_expires_at = null;
        $usuario->save();

        return response()->json(['message' => 'Código verificado correctamente'], 200);
    }

    public function verificarPassword(Request $request) {
        // Validar que los campos email y password estén presentes
        $validator = Validator::make($request->all(), [
            'correo' => 'required|email|string|max:255|exists:usuarios,correo',
            'contrasena' => ['required','string','min:8','max:16','regex:/[a-zA-Z]/','regex:/[0-9]/','regex:/[\W]/'],
        ]);

        // Verificar si el usuario existe
        $usuario = Usuario::where('correo', $request->correo)->first();

        if (!$usuario) {
            $data = [
                'message' => 'Correo electrónico no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        // Verificar que la contraseña sea correcta
        if (Hash::check($request->contrasena, $usuario->contrasena)) {
            $data = [
                'message' => 'La contraseña es igual a la existente',
                'status' => 401
            ];
            return response()->json($data, 401);
        }

        $data = [
            'message' => 'Contraseña permitida',
            'user' => $usuario,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function cambiarPassword(Request $request) {
        // Validar que los campos email y password estén presentes
        $validator = Validator::make($request->all(), [
            'correo' => 'required|email|string|max:255|exists:usuarios,correo',
            'contrasena' => ['required','string','min:8','max:16','regex:/[a-zA-Z]/','regex:/[0-9]/','regex:/[\W]/'],
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        // Verificar si el usuario existe
        $usuario = Usuario::where('correo', $request->correo)->first();

        if (!$usuario) {
            $data = [
                'message' => 'Correo electrónico no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $usuario->contrasena = bcrypt($request->contrasena);

        $usuario->save();

        $data = [
            'message' => 'Contraseña actualizado',
            'user' => $usuario,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function modificarUser(Request $request, $id) {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'correo' => 'required|email|string|max:255|unique:usuarios,correo,' . $id,
            'contrasena' => ['required','string','min:8','max:16','regex:/[a-zA-Z]/','regex:/[0-9]/','regex:/[\W]/'],
            'fecha_nacimiento' => 'required|date',
            'pesoActual' => 'required|numeric|min:0',
            'pesoObjetivo' => 'required|numeric|min:0',
            'nivel' => 'required|string|in:Aficionado,Intermedio,Avanzado',
            'rol' => 'required|string|in:Usuario,Administrador'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        $usuario->nombre = $request->nombre;
        $usuario->apellido = $request->apellido;
        $usuario->correo = $request->correo;
        $usuario->contrasena = bcrypt($request->contrasena);
        $usuario->fecha_nacimiento = $request->fecha_nacimiento;
        $usuario->pesoActual = $request->pesoActual;
        $usuario->pesoObjetivo = $request->pesoObjetivo;
        $usuario->nivel = $request->nivel;
        $usuario->rol = $request->rol;
        $usuario->save();

        $data = [
            'message' => 'Usuario actualizado',
            'usuario' => $usuario,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function modificarCampoUser(Request $request, $id) {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre' => 'string|max:255',
            'apellido' => 'string|max:255',
            'correo' => 'email|string|max:255|unique:usuarios,correo,' . $id,
            'contrasena' => ['string','min:8','max:16','regex:/[a-zA-Z]/','regex:/[0-9]/','regex:/[\W]/'],
            'fecha_nacimiento' => 'date',
            'altura' => 'numeric|min:0',
            'pesoActual' => 'numeric|min:0',
            'pesoObjetivo' => 'numeric|min:0',
            'nivel' => 'string|in:Aficionado,Intermedio,Avanzado',
            'rol' => 'string|in:Usuario,Administrador',
            'numero_tarjeta' => 'string|min:16|max:16|unique:usuarios,numero_tarjeta',
            'nombre_titular' => 'string|max:255|unique:usuarios,nombre_titular',
            'cvv' => 'string|min:3|max:3',
            'fecha_vencimiento' => 'string'
        ]);

        if ($validator->fails()) {
            $data = [
                'message' => 'Error en la validación de los datos',
                'errors' => $validator->errors(),
                'status' => 400
            ];
            return response()->json($data, 400);
        }

        if ($request->has('nombre')) {
            $usuario->nombre = $request->nombre;
        }

        if ($request->has('apellido')) {
            $usuario->apellido = $request->apellido;
        }

        if ($request->has('correo')) {
            $usuario->correo = $request->correo;
        }

        if ($request->has('contrasena')) {
            $usuario->contrasena = bcrypt($request->contrasena);
        }

        if ($request->has('fecha_nacimiento')) {
            $usuario->fecha_nacimiento = $request->fecha_nacimiento;
        }

        if ($request->has('altura')) {
            $usuario->altura = $request->altura;
        }

        if ($request->has('pesoActual')) {
            $usuario->pesoActual = $request->pesoActual;
        }

        if ($request->has('pesoObjetivo')) {
            $usuario->pesoObjetivo = $request->pesoObjetivo;
        }

        if ($request->has('nivel')) {
            $usuario->nivel = $request->nivel;
        }

        if ($request->has('rol')) {
            $usuario->rol = $request->rol;
        }

        if ($request->has('numero_tarjeta')) {
            $usuario->numero_tarjeta = $request->numero_tarjeta;
        }

        if ($request->has('nombre_titular')) {
            $usuario->nombre_titular = $request->nombre_titular;
        }

        if ($request->has('cvv')) {
            $usuario->cvv = $request->cvv;
        }

        if ($request->has('fecha_vencimiento')) {
            $usuario->fecha_vencimiento = $request->fecha_vencimiento;
        }

        $usuario->save();

        $data = [
            'message' => 'Usuario actualizado',
            'user' => $usuario,
            'status' => 200
        ];

        return response()->json($data, 200);
    }

    public function eliminarUser($id) {
        $usuario = Usuario::find($id);

        if (!$usuario) {
            $data = [
                'message' => 'Usuario no encontrado',
                'status' => 404
            ];
            return response()->json($data, 404);
        }

        $usuario->delete();

        $data = [
            'message' => 'Usuario eliminado',
            'status' => 200
        ];

        return response()->json($data, 200);
    }
}
