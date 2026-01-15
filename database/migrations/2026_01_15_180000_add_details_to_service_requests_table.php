<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_requests', function (Blueprint $table) {
            $table->date('requested_date')->nullable();
            $table->time('requested_time')->nullable();
            $table->text('address')->nullable();
            $table->string('phone')->nullable();
            $table->text('notes')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('service_requests', function (Blueprint $table) {
            $table->dropColumn(['requested_date', 'requested_time', 'address', 'phone', 'notes']);
        });
    }
};
