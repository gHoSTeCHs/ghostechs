<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdatePageRequest;
use App\Models\Page;
use App\Services\PageService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function __construct(
        private PageService $pageService,
    ) {}

    public function edit(string $slug): Response
    {
        $page = $this->pageService->getBySlug($slug);

        return Inertia::render('admin/pages/form', [
            'page' => $page,
        ]);
    }

    public function update(UpdatePageRequest $request, Page $page): RedirectResponse
    {
        $this->pageService->update($page, $request->validated());

        return back()->with('success', 'Page updated.');
    }
}
