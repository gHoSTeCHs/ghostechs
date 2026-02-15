<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use App\Models\Post;
use App\Models\Project;
use App\Models\Tag;
use App\Models\Technology;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $counts = [
            'projects' => Project::query()->count(),
            'posts' => Post::query()->count(),
            'tags' => Tag::query()->count(),
            'technologies' => Technology::query()->count(),
            'pages' => Page::query()->count(),
        ];

        $recentProjects = Project::query()
            ->latest('updated_at')
            ->limit(5)
            ->get(['id', 'title', 'updated_at'])
            ->map(fn (Project $p) => [
                'type' => 'project',
                'id' => $p->id,
                'title' => $p->title,
                'updated_at' => $p->updated_at->toISOString(),
            ]);

        $recentPosts = Post::query()
            ->latest('updated_at')
            ->limit(5)
            ->get(['id', 'title', 'updated_at'])
            ->map(fn (Post $p) => [
                'type' => 'post',
                'id' => $p->id,
                'title' => $p->title,
                'updated_at' => $p->updated_at->toISOString(),
            ]);

        $recentItems = $recentProjects->merge($recentPosts)
            ->sortByDesc('updated_at')
            ->take(5)
            ->values()
            ->all();

        return Inertia::render('admin/dashboard', [
            'counts' => $counts,
            'recentItems' => $recentItems,
        ]);
    }
}
