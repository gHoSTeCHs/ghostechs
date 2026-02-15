<?php

use App\Models\Project;
use App\Models\ProjectSection;

it('renders project show with sections and body_html', function () {
    $project = Project::factory()->create(['is_visible' => true, 'slug' => 'test-project']);
    ProjectSection::factory()->for($project)->create([
        'body' => '# Hello',
        'is_visible' => true,
    ]);

    $this->get(route('projects.show', 'test-project'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('projects/show')
            ->has('project')
            ->has('settings')
            ->where('prevProject', null)
            ->where('nextProject', null)
        );
});

it('returns 404 for hidden project', function () {
    Project::factory()->hidden()->create(['slug' => 'hidden-project']);

    $this->get(route('projects.show', 'hidden-project'))
        ->assertNotFound();
});

it('computes prev and next projects', function () {
    Project::factory()->create(['is_visible' => true, 'sort_order' => 0, 'slug' => 'first']);
    Project::factory()->create(['is_visible' => true, 'sort_order' => 1, 'slug' => 'second']);
    Project::factory()->create(['is_visible' => true, 'sort_order' => 2, 'slug' => 'third']);

    $this->get(route('projects.show', 'second'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->where('prevProject.slug', 'first')
            ->where('nextProject.slug', 'third')
        );
});
