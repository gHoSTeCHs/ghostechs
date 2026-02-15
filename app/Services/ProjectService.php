<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class ProjectService
{
    public function getVisibleProjects(): Collection
    {
        return Project::query()
            ->visible()
            ->ordered()
            ->with(['technologies', 'media'])
            ->get();
    }

    public function getFeaturedProjects(): Collection
    {
        return Project::query()
            ->visible()
            ->featured()
            ->ordered()
            ->with(['technologies', 'media'])
            ->get();
    }

    public function getBySlug(string $slug): Project
    {
        return Project::query()
            ->visible()
            ->where('slug', $slug)
            ->with(['visibleSections', 'technologies', 'media'])
            ->firstOrFail();
    }

    public function getAllForAdmin(): Collection
    {
        return Project::query()
            ->ordered()
            ->with('technologies')
            ->withCount('sections')
            ->get();
    }

    public function create(array $data): Project
    {
        $technologyIds = $data['technology_ids'] ?? [];
        unset($data['technology_ids']);

        $data['slug'] = Str::slug($data['title']);

        $project = Project::query()->create($data);

        if ($technologyIds) {
            $project->technologies()->sync($technologyIds);
        }

        return $project->load('technologies');
    }

    public function update(Project $project, array $data): Project
    {
        $technologyIds = $data['technology_ids'] ?? null;
        unset($data['technology_ids']);

        $project->update($data);

        if ($technologyIds !== null) {
            $project->technologies()->sync($technologyIds);
        }

        return $project->refresh()->load('technologies');
    }

    public function delete(Project $project): void
    {
        $project->technologies()->detach();
        $project->sections()->delete();
        $project->clearMediaCollection('thumbnail');
        $project->clearMediaCollection('screenshots');
        $project->delete();
    }

    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $position => $id) {
            Project::query()
                ->where('id', $id)
                ->update(['sort_order' => $position]);
        }
    }
}
