<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // For MySQL/MariaDB we can just alter the column
        if (config('database.default') !== 'sqlite') {
            DB::statement("ALTER TABLE service_requests MODIFY COLUMN service_id BIGINT UNSIGNED NULL");
        } else {
            // SQLite doesn't support MODIFY COLUMN easily, so we usually recreate table or create new nullable column
            // Assuming this is likely MySQL in production or development based on migration style, 
            // but for safety in dev environment (often SQLite for tests), we can try standard Schema modification if supported
            Schema::table('service_requests', function (Blueprint $table) {
                $table->foreignId('service_id')->nullable()->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (config('database.default') !== 'sqlite') {
             DB::statement("ALTER TABLE service_requests MODIFY COLUMN service_id BIGINT UNSIGNED NOT NULL");
        } else {
             Schema::table('service_requests', function (Blueprint $table) {
                $table->foreignId('service_id')->nullable(false)->change();
            });
        }
    }
};
