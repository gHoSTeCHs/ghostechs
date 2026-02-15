<?php

use App\Enums\SectionType;
use App\Models\Project;
use App\Models\ProjectSection;
use App\Services\ProjectSectionService;

beforeEach(function () {
    $this->service = app(ProjectSectionService::class);
    $this->project = Project::factory()->create();
});

it('returns sections for a project ordered by sort_order', function () {
    ProjectSection::factory()->create(['project_id' => $this->project->id, 'sort_order' => 2, 'title' => 'Second']);
    ProjectSection::factory()->create(['project_id' => $this->project->id, 'sort_order' => 1, 'title' => 'First']);

    $sections = $this->service->getForProject($this->project);

    expect($sections)->toHaveCount(2);
    expect($sections->first()->title)->toBe('First');
});

it('creates a section with auto-calculated sort_order', function () {
    ProjectSection::factory()->create(['project_id' => $this->project->id, 'sort_order' => 3]);

    $section = $this->service->create($this->project, [
        'type' => SectionType::Overview,
        'title' => 'New Section',
        'body' => 'Section body',
    ]);

    expect($section->sort_order)->toBe(4);
    expect($section->project_id)->toBe($this->project->id);
});

it('updates a section', function () {
    $section = ProjectSection::factory()->create(['project_id' => $this->project->id, 'title' => 'Old']);

    $updated = $this->service->update($section, ['title' => 'New Title']);

    expect($updated->title)->toBe('New Title');
});

it('deletes a section', function () {
    $section = ProjectSection::factory()->create(['project_id' => $this->project->id]);

    $this->service->delete($section);

    expect(ProjectSection::query()->find($section->id))->toBeNull();
});

it('reorders sections by position', function () {
    $a = ProjectSection::factory()->create(['project_id' => $this->project->id, 'sort_order' => 0]);
    $b = ProjectSection::factory()->create(['project_id' => $this->project->id, 'sort_order' => 1]);

    $this->service->reorder([$b->id, $a->id]);

    expect($b->refresh()->sort_order)->toBe(0);
    expect($a->refresh()->sort_order)->toBe(1);
});
