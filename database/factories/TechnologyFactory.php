<?php

namespace Database\Factories;

use App\Models\Technology;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends Factory<Technology> */
class TechnologyFactory extends Factory
{
    protected $model = Technology::class;

    public function definition(): array
    {
        $name = fake()->unique()->words(2, true);

        return [
            'name' => $name,
            'slug' => Str::slug($name),
            'category' => fake()->optional()->randomElement(['frontend', 'backend', 'database', 'devops', 'language']),
        ];
    }
}
