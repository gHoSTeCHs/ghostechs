<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProjectRequest;
use App\Http\Requests\Admin\UpdateProjectRequest;
use App\Models\Project;
use App\Services\ProjectService;
use App\Services\TechnologyService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function __construct(
        private ProjectService $projectService,
        private TechnologyService $technologyService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('admin/projects/index', [
            'projects' => $this->projectService->getAllForAdmin(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/projects/form', [
            'technologies' => $this->technologyService->getAll(),
        ]);
    }

    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $project = $this->projectService->create($request->validated());

        return to_route('admin.projects.edit', $project)
            ->with('success', 'Project created.');
    }

    public function edit(Project $project): Response
    {
        $project->load('technologies');

        return Inertia::render('admin/projects/form', [
            'project' => $project,
            'technologies' => $this->technologyService->getAll(),
        ]);
    }

    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $this->projectService->update($project, $request->validated());

        return back()->with('success', 'Project updated.');
    }

    public function destroy(Project $project): RedirectResponse
    {
        $this->projectService->delete($project);

        return to_route('admin.projects.index')
            ->with('success', 'Project deleted.');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate([
            'ordered_ids' => ['required', 'array'],
            'ordered_ids.*' => ['integer', 'exists:projects,id'],
        ]);

        $this->projectService->reorder($request->input('ordered_ids'));

        return back()->with('success', 'Projects reordered.');
    }
}
