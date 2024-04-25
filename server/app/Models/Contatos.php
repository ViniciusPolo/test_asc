<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contatos extends Model
{
    use HasFactory;

    protected $table = 'contatos';

    protected $fillable = [
        'nome',
        'sobrenome',
        'email',
        'telefone',
        'endereco',
        'cidade',
        'cep',
        'data_nascimento',
        'campanha'
    ];
    
}
