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
        // Update users table to add 'technician' role
        // Note: SQLite doesn't support modifying enums easily, but for MySQL/PostgreSQL:
        if (config('database.default') !== 'sqlite') {
            DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'user', 'technician') DEFAULT 'user'");
        }

        // Update technicians table
        Schema::table('technicians', function (Blueprint $table) {
            $table->decimal('hourly_rate', 10, 2)->nullable()->after('experience_years');
            $table->json('availability')->nullable()->after('hourly_rate');
            $table->string('city')->nullable()->after('availability');
            $table->text('bio')->nullable()->after('city');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('technicians', function (Blueprint $table) {
            $table->dropColumn(['hourly_rate', 'availability', 'city', 'bio']);
        });

        if (config('database.default') !== 'sqlite') {
            DB::statement("ALTER TABLE users MODIFY COLUMN role ENUM('admin', 'user') DEFAULT 'user'");
        }
    }
};
