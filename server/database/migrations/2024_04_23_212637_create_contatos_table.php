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
        Schema::create('contatos', function (Blueprint $table) {
            $table->id();
            $table->string('nome')->default('');
            $table->string('sobrenome')->default('');
            $table->string('email')->nullable()->default('');
            $table->bigInteger('telefone')->default(0);
            $table->string('endereco')->nullable()->default('');
            $table->string('cidade')->nullable()->default('');
            $table->string('cep')->nullable()->default('');
            $table->string('data_nascimento')->nullable()->default('');
            $table->string('campanha')->nullable()->default('Promoção');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contatos');
    }
};
