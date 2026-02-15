<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Services\MarkdownService;
use App\Services\PostService;
use App\Services\SiteSettingService;
use App\Services\TagService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function __construct(
        private PostService $postService,
        private TagService $tagService,
        private MarkdownService $markdownService,
        private SiteSettingService $settingService,
    ) {}

    public function index(Request $request): Response
    {
        $tagSlug = $request->query('tag');
        $posts = $this->postService->getPublished($tagSlug);

        $posts->each(function ($post) {
            if ($post->body) {
                $post->body_html = $this->markdownService->toHtml($post->body);
            }
        });

        return Inertia::render('blog/index', [
            'posts' => $posts,
            'tags' => $this->tagService->getAll(),
            'activeTag' => $tagSlug,
            'settings' => $this->settingService->getPublicSettings(),
        ]);
    }

    public function show(string $slug): Response
    {
        $post = $this->postService->getBySlug($slug);
        $post->body_html = $this->markdownService->toHtml($post->body);
        $relatedPosts = $this->postService->getRelatedPosts($post);

        return Inertia::render('blog/show', [
            'post' => $post,
            'relatedPosts' => $relatedPosts,
            'settings' => $this->settingService->getPublicSettings(),
        ]);
    }
}
