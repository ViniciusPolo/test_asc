<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ContatosController;

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

Route::get('contatos', [ContatosController::class, 'index']);
Route::post('contatos/incluir', [ContatosController::class, 'store']);
Route::get('contatos/busca/{id}', [ContatosController::class, 'show']);
Route::get('contatos/busca-por', [ContatosController::class, 'findBy']);
Route::put('contatos/editar/{id}', [ContatosController::class, 'update']);
Route::delete('contatos/apagar/{id}', [ContatosController::class, 'destroy']);
