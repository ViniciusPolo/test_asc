<?php

namespace App\Http\Controllers;

use App\Models\Contatos;
use Illuminate\Http\Request;
use App\Http\Resources\ContatosResource;

class ContatosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $contatos = Contatos::all();
        return $contatos;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            
            foreach ($request->json() as $contatoData) {
                
                $telefone = (string) $contatoData['Telefone'];
                if (!preg_match('/^(\(\d{2}\))?\s?\d{4,5}-?\d{4}$/', $telefone) && !preg_match('/^\d{10,11}$/', $telefone)) {
                    return response()->json(['error' => 'Número de telefone inválido: ' . $telefone], 500);
                }

                $contatoExistente = Contatos::firstOrNew([
                    'nome' => $contatoData['Nome'],
                    'sobrenome' => $contatoData['Sobrenome'],
                    'email' => $contatoData['Email'],
                    'endereco' => $contatoData['Endereco'],
                    'cidade' => $contatoData['Cidade'],
                    'cep' => $contatoData['CEP'],
                    'telefone' => $contatoData['Telefone'],
                    'data_nascimento' => $contatoData['DataDeNascimento'],
                ]);
                if ($contatoExistente->exists) {
                    echo "Contato já existe!";
                } else {
                    $contato = new Contatos;
                    $contato->nome = $contatoData['Nome'];
                    $contato->sobrenome = $contatoData['Sobrenome'];
                    $contato->email = $contatoData['Email'];
                    $contato->endereco = $contatoData['Endereco'];
                    $contato->cidade = $contatoData['Cidade'];
                    $contato->cep = $contatoData['CEP'];
                    $contato->telefone = $contatoData['Telefone'];
                    $contato->data_nascimento = $contatoData['DataDeNascimento'];
 
                    if (isset($contatoData['Campanha'])) {
                        $contato->campanha = $contatoData['Campanha'];
                    }

                    if ($contato->save()) {
                        // return new ContatosResource($contato);
                    } else {
                        return response()->json(['error' => 'Erro ao salvar os dados'], 500);
                    }
                }
            }

            return response()->json(['message' => 'Contatos adicionados com sucesso'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao processar a solicitação', $e], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
       $contato = Contatos::find($id);
       return new ContatosResource($contato);
    }

    /**
     * Display the specified resource.
     */
    public function findBy(Request $request)
    {
        $query = Contatos::query();
        if ($request->has('nome')) {
            $query->where('nome', $request->nome);
        }
        if ($request->has('sobrenome')) {
            $query->where('sobrenome', $request->sobrenome);
        }
        if ($request->has('cidade')) {
            $query->where('cidade', $request->cidade);
        }
        if ($request->has('campanha')) {
            $query->where('campanha', $request->campanha);
        }

        $contatos = $query->get();
        return response()->json($contatos);
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        try {
            $contato = Contatos::findOrFail($id);
            $contato->nome = $request->input('nome');
            $contato->sobrenome = $request->input('sobrenome');
            $contato->email = $request->input('email');
            $contato->endereco = $request->input('endereco');
            $contato->cidade = $request->input('cidade');
            $contato->cep = $request->input('cep');
            $contato->telefone = $request->input('telefone');
            $contato->data_nascimento = $request->input('data_nascimento');
            $contato->campanha = $request->input('campanha');
        
            if( $contato->save() ){
              return new ContatosResource( $contato );
            }
    
            return response()->json($contato);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage("Erro ao atualizar, $e")], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
