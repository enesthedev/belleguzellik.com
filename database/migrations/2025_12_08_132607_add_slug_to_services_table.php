<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('name');
        });

        $services = DB::table('services')->get();
        foreach ($services as $service) {
            $slug = Str::slug($service->name);
            $originalSlug = $slug;
            $counter = 1;

            while (DB::table('services')->where('slug', $slug)->where('id', '!=', $service->id)->exists()) {
                $slug = $originalSlug.'-'.$counter;
                $counter++;
            }

            DB::table('services')->where('id', $service->id)->update(['slug' => $slug]);
        }

        Schema::table('services', function (Blueprint $table) {
            $table->string('slug')->unique()->nullable(false)->change();
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
