<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('slug', 255)->unique();
            $table->string('title', 255);
            $table->string('tagline', 500);
            $table->text('description');
            $table->string('status', 50)->default('in_development');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_visible')->default(true);
            $table->integer('sort_order')->default(0);
            $table->string('external_url', 500)->nullable();
            $table->string('github_url', 500)->nullable();
            $table->string('meta_title', 255)->nullable();
            $table->string('meta_description', 500)->nullable();
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->index(['is_visible', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
