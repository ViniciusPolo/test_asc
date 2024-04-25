<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContatosResource extends JsonResource
{
        /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'nome'=>$this->nome,
        'sobrenome'=>$this->sobrenome,
        'email'=>$this->email,
        'endereco'=>$this->endereco,
        'cidade'=>$this->cidade,    
        'cep'=>$this->cep,    
        'telefone'=>$this->telefone,    
        'data_nascimento'=>$this->data_nascimento,    
        'campanha'=>$this->campanha,    
];
    }
}
