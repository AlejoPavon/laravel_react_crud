<?php
// database/migrations/xxxx_add_developer_fields_to_users_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('position')->nullable();
            $table->json('technologies')->nullable(); // Guarda array como JSON
            $table->decimal('salary', 10, 2)->nullable();
            $table->enum('status', ['active', 'probation', 'inactive'])->default('active');
            $table->integer('experience')->nullable(); // Años de experiencia
            $table->date('joined_date')->nullable();
            $table->string('phone')->nullable();
            $table->string('photo')->nullable(); // URL de la foto
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'position', 
                'technologies', 
                'salary', 
                'status', 
                'experience',
                'joined_date',
                'phone',
                'photo'
            ]);
        });
    }
};