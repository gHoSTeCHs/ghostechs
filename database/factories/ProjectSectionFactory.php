<?php

namespace Database\Factories;

use App\Enums\SectionType;
use App\Models\Project;
use App\Models\ProjectSection;
use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<ProjectSection> */
class ProjectSectionFactory extends Factory
{
    protected $model = ProjectSection::class;

    public function definition(): array
    {
        return [
            'project_id' => Project::factory(),
            'type' => SectionType::Overview,
            'title' => fake()->sentence(3),
            'body' => fake()->paragraphs(3, true),
            'sort_order' => 0,
            'is_visible' => true,
        ];
    }

    public function overview(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => SectionType::Overview,
        ]);
    }

    public function mission(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => SectionType::Mission,
        ]);
    }

    public function problem(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => SectionType::Problem,
        ]);
    }

    public function solution(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => SectionType::Solution,
        ]);
    }

    public function architecture(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => SectionType::Architecture,
        ]);
    }

    public function lessons(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => SectionType::Lessons,
        ]);
    }

    public function roadmap(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => SectionType::Roadmap,
        ]);
    }

    public function custom(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => SectionType::Custom,
        ]);
    }
}
