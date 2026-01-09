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
       Schema::create('reviews', function (Blueprint $table) {
    $table->id();

    $table->foreignId('service_request_id')
          ->constrained('service_requests')
          ->onDelete('cascade');

    $table->foreignId('user_id')
          ->constrained('users')
          ->onDelete('cascade');

    $table->foreignId('technician_id')
          ->constrained('technicians')
          ->onDelete('cascade');

    $table->tinyInteger('rating'); // من 1 لـ 5
    $table->text('comment')->nullable();

    $table->timestamps();
});
    }

   
    public function down(): void
    {
        Schema::dropIfExists('reviews');
    }
};
