<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreTagRequest;
use App\Models\Tag;
use App\Services\TagService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TagController extends Controller
{
    public function __construct(
        private TagService $tagService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('admin/tags/index', [
            'tags' => $this->tagService->getAll(),
        ]);
    }

    public function store(StoreTagRequest $request): RedirectResponse
    {
        $this->tagService->create($request->validated());

        return to_route('admin.tags.index')
            ->with('success', 'Tag created.');
    }

    public function destroy(Tag $tag): RedirectResponse
    {
        $this->tagService->delete($tag);

        return to_route('admin.tags.index')
            ->with('success', 'Tag deleted.');
    }
}
