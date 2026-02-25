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
        Schema::create('developers', function (Blueprint $table) {
            $table->id();
            
            // Clave foránea con el usuario
            $table->foreignId('user_id')
                  ->constrained()
                  ->onDelete('cascade')
                  ->comment('Usuario/Compañía al que pertenece');
            
            // Datos personales
            $table->string('name', 100)->comment('Nombre completo del desarrollador');
            
            // Datos profesionales
            $table->string('main_stack', 100)->comment('Stack principal del desarrollador');
            $table->enum('seniority', ['JR', 'SSR', 'SR'])
                  ->default('JR')
                  ->comment('Seniority: JR, SSR o SR');
            $table->decimal('hourly_rate', 8, 2)->comment('Tarifa por hora en USD');
            
            // Estado
            $table->boolean('is_active')
                  ->default(true)
                  ->comment('Si el desarrollador está activo actualmente');
            
            // Timestamps
            $table->timestamps();
            
            // Índices para búsquedas rápidas
            $table->index('is_active');
            $table->index('seniority');
            $table->index('main_stack');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('developers');
    }
};