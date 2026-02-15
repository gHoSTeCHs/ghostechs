<?php

use App\Enums\ProjectStatus;
use App\Models\Project;
use App\Models\Technology;
use App\Services\ProjectService;

beforeEach(function () {
    $this->service = app(ProjectService::class);
});

it('returns visible projects ordered by sort_order', function () {
    Project::factory()->create(['is_visible' => true, 'sort_order' => 2, 'title' => 'Second']);
    Project::factory()->create(['is_visible' => true, 'sort_order' => 1, 'title' => 'First']);
    Project::factory()->hidden()->create(['title' => 'Hidden']);

    $projects = $this->service->getVisibleProjects();

    expect($projects)->toHaveCount(2);
    expect($projects->first()->title)->toBe('First');
});

it('returns featured visible projects', function () {
    Project::factory()->create(['is_visible' => true, 'is_featured' => true]);
    Project::factory()->create(['is_visible' => true, 'is_featured' => false]);
    Project::factory()->hidden()->create(['is_featured' => true]);

    $featured = $this->service->getFeaturedProjects();

    expect($featured)->toHaveCount(1);
});

it('retrieves a visible project by slug with relations', function () {
    $project = Project::factory()->create(['is_visible' => true, 'slug' => 'my-project']);

    $found = $this->service->getBySlug('my-project');

    expect($found->id)->toBe($project->id);
    expect($found->relationLoaded('technologies'))->toBeTrue();
    expect($found->relationLoaded('visibleSections'))->toBeTrue();
});

it('throws not found for hidden project slug', function () {
    Project::factory()->hidden()->create(['slug' => 'hidden-project']);

    $this->service->getBySlug('hidden-project');
})->throws(Illuminate\Database\Eloquent\ModelNotFoundException::class);

it('returns all projects for admin with sections count', function () {
    Project::factory()->create();
    Project::factory()->hidden()->create();

    $projects = $this->service->getAllForAdmin();

    expect($projects)->toHaveCount(2);
    expect($projects->first())->toHaveKey('sections_count');
});

it('creates a project with auto-slug and syncs technologies', function () {
    $tech = Technology::factory()->create();

    $project = $this->service->create([
        'title' => 'My New Project',
        'tagline' => 'A great project',
        'description' => 'Description here',
        'status' => ProjectStatus::InDevelopment,
        'technology_ids' => [$tech->id],
    ]);

    expect($project->slug)->toBe('my-new-project');
    expect($project->technologies)->toHaveCount(1);
});

it('updates a project and syncs technologies', function () {
    $project = Project::factory()->create();
    $tech = Technology::factory()->create();

    $updated = $this->service->update($project, [
        'title' => 'Updated Title',
        'technology_ids' => [$tech->id],
    ]);

    expect($updated->title)->toBe('Updated Title');
    expect($updated->technologies)->toHaveCount(1);
});

it('deletes a project with all relations', function () {
    $project = Project::factory()->create();
    $tech = Technology::factory()->create();
    $project->technologies()->attach($tech);

    $this->service->delete($project);

    expect(Project::query()->find($project->id))->toBeNull();
    expect($tech->projects()->count())->toBe(0);
});

it('reorders projects by position', function () {
    $a = Project::factory()->create(['sort_order' => 0]);
    $b = Project::factory()->create(['sort_order' => 1]);

    $this->service->reorder([$b->id, $a->id]);

    expect($b->refresh()->sort_order)->toBe(0);
    expect($a->refresh()->sort_order)->toBe(1);
});
