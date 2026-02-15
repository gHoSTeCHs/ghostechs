<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StorePostRequest;
use App\Http\Requests\Admin\UpdatePostRequest;
use App\Models\Post;
use App\Services\PostService;
use App\Services\TagService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function __construct(
        private PostService $postService,
        private TagService $tagService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('admin/posts/index', [
            'posts' => $this->postService->getAllForAdmin(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/posts/form', [
            'tags' => $this->tagService->getAll(),
        ]);
    }

    public function store(StorePostRequest $request): RedirectResponse
    {
        $post = $this->postService->create($request->validated());

        return to_route('admin.posts.edit', $post)
            ->with('success', 'Post created.');
    }

    public function edit(Post $post): Response
    {
        $post->load('tags');

        return Inertia::render('admin/posts/form', [
            'post' => $post,
            'tags' => $this->tagService->getAll(),
        ]);
    }

    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $this->postService->update($post, $request->validated());

        return back()->with('success', 'Post updated.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $this->postService->delete($post);

        return to_route('admin.posts.index')
            ->with('success', 'Post deleted.');
    }
}
