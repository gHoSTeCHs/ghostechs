<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Project;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $projects = Project::query()
            ->visible()
            ->ordered()
            ->select(['slug', 'updated_at'])
            ->get();

        $posts = Post::query()
            ->published()
            ->recent()
            ->select(['slug', 'updated_at'])
            ->get();

        return response()
            ->view('sitemap', compact('projects', 'posts'))
            ->header('Content-Type', 'text/xml');
    }
}
