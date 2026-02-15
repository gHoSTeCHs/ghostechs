<?php

namespace App\Services;

use App\Models\Project;
use App\Models\ProjectSection;
use Illuminate\Support\Collection;

class ProjectSectionService
{
    public function getForProject(Project $project): Collection
    {
        return $project->sections()
            ->orderBy('sort_order')
            ->get();
    }

    public function create(Project $project, array $data): ProjectSection
    {
        if (! isset($data['sort_order'])) {
            $data['sort_order'] = $project->sections()->max('sort_order') + 1;
        }

        $data['project_id'] = $project->id;

        return ProjectSection::query()->create($data);
    }

    public function update(ProjectSection $section, array $data): ProjectSection
    {
        $section->update($data);

        return $section->refresh();
    }

    public function delete(ProjectSection $section): void
    {
        $section->delete();
    }

    public function reorder(array $orderedIds): void
    {
        foreach ($orderedIds as $position => $id) {
            ProjectSection::query()
                ->where('id', $id)
                ->update(['sort_order' => $position]);
        }
    }
}
