<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\MarkdownService;
use App\Services\ProjectService;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function __construct(
        private ProjectService $projectService,
        private MarkdownService $markdownService,
    ) {}

    public function show(string $slug): Response
    {
        $project = $this->projectService->getBySlug($slug);

        $project->visibleSections->each(function ($section) {
            $section->body_html = $this->markdownService->toHtml($section->body);
        });

        $project->thumbnail_url = $project->getFirstMediaUrl('thumbnail') ?: null;
        $project->screenshots = $project->getMedia('screenshots')->map(fn ($media) => [
            'id' => $media->id,
            'url' => $media->getUrl(),
            'name' => $media->name,
            'file_name' => $media->file_name,
            'mime_type' => $media->mime_type,
            'size' => $media->size,
            'order_column' => $media->order_column,
        ]);

        $visibleOrdered = Project::query()
            ->visible()
            ->ordered()
            ->pluck('slug', 'id');

        $slugs = $visibleOrdered->values();
        $currentIndex = $slugs->search($slug);

        $prevProject = null;
        $nextProject = null;

        if ($currentIndex !== false && $currentIndex > 0) {
            $prevSlug = $slugs[$currentIndex - 1];
            $prevProject = Project::query()
                ->where('slug', $prevSlug)
                ->first(['slug', 'title']);
        }

        if ($currentIndex !== false && $currentIndex < $slugs->count() - 1) {
            $nextSlug = $slugs[$currentIndex + 1];
            $nextProject = Project::query()
                ->where('slug', $nextSlug)
                ->first(['slug', 'title']);
        }

        return Inertia::render('projects/show', [
            'project' => $project,
            'prevProject' => $prevProject,
            'nextProject' => $nextProject,
        ]);
    }
}
