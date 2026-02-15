<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProjectSectionRequest;
use App\Http\Requests\Admin\UpdateProjectSectionRequest;
use App\Models\Project;
use App\Models\ProjectSection;
use App\Services\ProjectSectionService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectSectionController extends Controller
{
    public function __construct(
        private ProjectSectionService $sectionService,
    ) {}

    public function index(Project $project): Response
    {
        $project->load('sections');

        return Inertia::render('admin/projects/sections/index', [
            'project' => $project,
        ]);
    }

    public function create(Project $project): Response
    {
        return Inertia::render('admin/projects/sections/form', [
            'project' => $project->only('id', 'title', 'slug'),
        ]);
    }

    public function store(StoreProjectSectionRequest $request, Project $project): RedirectResponse
    {
        $this->sectionService->create($project, $request->validated());

        return to_route('admin.projects.sections.index', $project)
            ->with('success', 'Section created.');
    }

    public function edit(ProjectSection $section): Response
    {
        $section->load('project');

        return Inertia::render('admin/projects/sections/form', [
            'project' => $section->project->only('id', 'title', 'slug'),
            'section' => $section,
        ]);
    }

    public function update(UpdateProjectSectionRequest $request, ProjectSection $section): RedirectResponse
    {
        $this->sectionService->update($section, $request->validated());

        return back()->with('success', 'Section updated.');
    }

    public function destroy(ProjectSection $section): RedirectResponse
    {
        $projectId = $section->project_id;
        $this->sectionService->delete($section);

        return to_route('admin.projects.sections.index', $projectId)
            ->with('success', 'Section deleted.');
    }

    public function reorder(Request $request, Project $project): RedirectResponse
    {
        $request->validate([
            'ordered_ids' => ['required', 'array'],
            'ordered_ids.*' => ['integer', 'exists:project_sections,id'],
        ]);

        $this->sectionService->reorder($request->input('ordered_ids'));

        return back()->with('success', 'Sections reordered.');
    }
}
