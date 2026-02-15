<?php

use App\Enums\ProjectStatus;
use App\Models\Project;
use App\Models\Technology;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
});

it('redirects unauthenticated users to login', function () {
    $this->get(route('admin.projects.index'))
        ->assertRedirect(route('login'));
});

it('renders index with projects', function () {
    Project::factory()->count(2)->create();

    $this->actingAs($this->user)
        ->get(route('admin.projects.index'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/projects/index')
            ->has('projects', 2)
        );
});

it('renders create form with technologies', function () {
    Technology::factory()->count(3)->create();

    $this->actingAs($this->user)
        ->get(route('admin.projects.create'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/projects/form')
            ->has('technologies', 3)
        );
});

it('stores a project and redirects to edit', function () {
    $this->actingAs($this->user)
        ->post(route('admin.projects.store'), [
            'title' => 'My Project',
            'tagline' => 'A tagline',
            'description' => 'Some description',
            'status' => ProjectStatus::InDevelopment->value,
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect(Project::query()->where('slug', 'my-project')->exists())->toBeTrue();
});

it('renders edit form with project and technologies', function () {
    $project = Project::factory()->create();

    $this->actingAs($this->user)
        ->get(route('admin.projects.edit', $project))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/projects/form')
            ->has('project')
            ->has('technologies')
        );
});

it('updates a project', function () {
    $project = Project::factory()->create();

    $this->actingAs($this->user)
        ->put(route('admin.projects.update', $project), [
            'title' => 'Updated Title',
            'tagline' => $project->tagline,
            'description' => $project->description,
            'status' => $project->status->value,
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect($project->refresh()->title)->toBe('Updated Title');
});

it('deletes a project', function () {
    $project = Project::factory()->create();

    $this->actingAs($this->user)
        ->delete(route('admin.projects.destroy', $project))
        ->assertRedirect(route('admin.projects.index'))
        ->assertSessionHas('success');

    expect(Project::query()->find($project->id))->toBeNull();
});

it('reorders projects', function () {
    $a = Project::factory()->create(['sort_order' => 0]);
    $b = Project::factory()->create(['sort_order' => 1]);

    $this->actingAs($this->user)
        ->post(route('admin.projects.reorder'), [
            'ordered_ids' => [$b->id, $a->id],
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect($b->refresh()->sort_order)->toBe(0);
    expect($a->refresh()->sort_order)->toBe(1);
});
