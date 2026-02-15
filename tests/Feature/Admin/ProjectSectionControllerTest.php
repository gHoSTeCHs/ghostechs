<?php

use App\Enums\SectionType;
use App\Models\Project;
use App\Models\ProjectSection;
use App\Models\User;

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->project = Project::factory()->create();
});

it('redirects unauthenticated users to login', function () {
    $this->get(route('admin.projects.sections.index', $this->project))
        ->assertRedirect(route('login'));
});

it('renders sections index for a project', function () {
    ProjectSection::factory()->for($this->project)->count(2)->create();

    $this->actingAs($this->user)
        ->get(route('admin.projects.sections.index', $this->project))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/projects/sections/index')
            ->has('project.sections', 2)
        );
});

it('renders create form', function () {
    $this->actingAs($this->user)
        ->get(route('admin.projects.sections.create', $this->project))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/projects/sections/form')
            ->has('project')
        );
});

it('stores a section', function () {
    $this->actingAs($this->user)
        ->post(route('admin.projects.sections.store', $this->project), [
            'type' => SectionType::Overview->value,
            'title' => 'Overview Section',
            'body' => 'Section body content',
            'is_visible' => true,
        ])
        ->assertRedirect(route('admin.projects.sections.index', $this->project))
        ->assertSessionHas('success');

    expect($this->project->sections()->count())->toBe(1);
});

it('renders edit form for a section', function () {
    $section = ProjectSection::factory()->for($this->project)->create();

    $this->actingAs($this->user)
        ->get(route('admin.sections.edit', $section))
        ->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('admin/projects/sections/form')
            ->has('section')
            ->has('project')
        );
});

it('updates a section', function () {
    $section = ProjectSection::factory()->for($this->project)->create();

    $this->actingAs($this->user)
        ->put(route('admin.sections.update', $section), [
            'type' => $section->type->value,
            'title' => 'Updated Title',
            'body' => $section->body,
            'is_visible' => true,
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect($section->refresh()->title)->toBe('Updated Title');
});

it('deletes a section and redirects to project sections', function () {
    $section = ProjectSection::factory()->for($this->project)->create();

    $this->actingAs($this->user)
        ->delete(route('admin.sections.destroy', $section))
        ->assertRedirect(route('admin.projects.sections.index', $this->project))
        ->assertSessionHas('success');

    expect(ProjectSection::query()->find($section->id))->toBeNull();
});

it('reorders sections', function () {
    $a = ProjectSection::factory()->for($this->project)->create(['sort_order' => 0]);
    $b = ProjectSection::factory()->for($this->project)->create(['sort_order' => 1]);

    $this->actingAs($this->user)
        ->post(route('admin.projects.sections.reorder', $this->project), [
            'ordered_ids' => [$b->id, $a->id],
        ])
        ->assertRedirect()
        ->assertSessionHas('success');

    expect($b->refresh()->sort_order)->toBe(0);
    expect($a->refresh()->sort_order)->toBe(1);
});
