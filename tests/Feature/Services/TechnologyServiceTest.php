<?php

use App\Models\Project;
use App\Models\Technology;
use App\Services\TechnologyService;

beforeEach(function () {
    $this->service = app(TechnologyService::class);
});

it('returns all technologies ordered by name with project count', function () {
    Technology::factory()->create(['name' => 'Vue']);
    Technology::factory()->create(['name' => 'React']);

    $technologies = $this->service->getAll();

    expect($technologies->first()->name)->toBe('React');
    expect($technologies->last()->name)->toBe('Vue');
    expect($technologies->first())->toHaveKey('projects_count');
});

it('creates a technology with auto-generated slug', function () {
    $tech = $this->service->create(['name' => 'Next.js', 'category' => 'Framework']);

    expect($tech->slug)->toBe('nextjs');
    expect($tech->category)->toBe('Framework');
});

it('updates a technology and regenerates slug when name changes', function () {
    $tech = Technology::factory()->create(['name' => 'Old Name', 'slug' => 'old-name']);

    $updated = $this->service->update($tech, ['name' => 'New Name']);

    expect($updated->name)->toBe('New Name');
    expect($updated->slug)->toBe('new-name');
});

it('does not regenerate slug when name is unchanged', function () {
    $tech = Technology::factory()->create(['name' => 'React', 'slug' => 'react']);

    $updated = $this->service->update($tech, ['name' => 'React', 'category' => 'Library']);

    expect($updated->slug)->toBe('react');
    expect($updated->category)->toBe('Library');
});

it('deletes a technology and detaches projects', function () {
    $tech = Technology::factory()->create();
    $project = Project::factory()->create();
    $tech->projects()->attach($project);

    $this->service->delete($tech);

    expect(Technology::query()->find($tech->id))->toBeNull();
    expect($project->technologies()->count())->toBe(0);
});
