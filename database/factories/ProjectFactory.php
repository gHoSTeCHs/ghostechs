<?php

namespace Database\Factories;

use App\Enums\ProjectStatus;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends Factory<Project> */
class ProjectFactory extends Factory
{
    protected $model = Project::class;

    public function definition(): array
    {
        $title = fake()->unique()->words(3, true);

        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'tagline' => fake()->sentence(),
            'description' => fake()->paragraphs(3, true),
            'status' => ProjectStatus::InDevelopment,
            'is_featured' => false,
            'is_visible' => true,
            'sort_order' => 0,
            'external_url' => fake()->optional()->url(),
            'github_url' => fake()->optional()->url(),
            'published_at' => fake()->optional()->dateTimeBetween('-1 year'),
        ];
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }

    public function hidden(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_visible' => false,
        ]);
    }

    public function archived(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProjectStatus::Archived,
        ]);
    }

    public function production(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProjectStatus::Production,
        ]);
    }

    public function inDevelopment(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProjectStatus::InDevelopment,
        ]);
    }
}
