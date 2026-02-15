<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\PostService;
use App\Services\ProjectService;
use App\Services\SiteSettingService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private ProjectService $projectService,
        private PostService $postService,
        private SiteSettingService $settingService,
    ) {}

    public function index(): Response
    {
        $projects = $this->projectService->getVisibleProjects()
            ->map(function ($project) {
                $project->thumbnail_url = $project->getFirstMediaUrl('thumbnail') ?: null;

                return $project;
            });

        return Inertia::render('welcome', [
            'projects' => $projects,
            'featuredPosts' => $this->postService->getFeaturedPublished(),
            'settings' => $this->settingService->getPublicSettings(),
        ]);
    }
}
